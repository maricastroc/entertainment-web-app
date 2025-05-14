/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import {
  getTvCasts,
  getTvDetail,
  getTvReviews,
  getTvSimilars,
  getTvVideos,
} from '../../../lib/tmdb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  try {
    await prisma.series.upsert({
      where: { id: id as string },
      update: {},
      create: { id: id as string },
    })

    const [detailRes, creditsRes, reviewsRes, similarsRes, videosRes] =
      await Promise.all([
        fetch(getTvDetail(id as string)),
        fetch(getTvCasts(id as string)),
        fetch(getTvReviews(id as string)),
        fetch(getTvSimilars(id as string)),
        fetch(getTvVideos(id as string)),
      ])

    const [detail, credits, reviewsData, similars, videos] = await Promise.all([
      detailRes.json(),
      creditsRes.json(),
      reviewsRes.json(),
      similarsRes.json(),
      videosRes.json(),
    ])

    await Promise.all(
      reviewsData.results.map(async (review: any) => {
        const details = review.author_details || {}

        await prisma.externalReview.upsert({
          where: { id: review.id },
          update: {
            author: review.author,
            content: review.content,
            createdAt: new Date(review.created_at),
            rating: details.rating,
            username: details.username,
            name: details.name,
            avatarPath: details.avatar_path,
            series: { connect: { id: id as string } },
          },
          create: {
            id: review.id,
            author: review.author,
            content: review.content,
            createdAt: new Date(review.created_at),
            rating: details.rating,
            username: details.username,
            name: details.name,
            avatarPath: details.avatar_path,
            series: { connect: { id: id as string } },
          },
        })
      }),
    )

    const [tvRatings, externalReviews] = await Promise.all([
      prisma.rating.findMany({
        where: { seriesId: id as string },
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true },
          },
        },
      }),
      prisma.externalReview.findMany({
        where: { seriesId: id as string },
      }),
    ])

    const ratingIds = tvRatings.map((r) => r.id)
    const externalReviewIds = externalReviews.map((r) => r.id)

    const votes = await prisma.vote.findMany({
      where: {
        OR: [
          { ratingId: { in: ratingIds } },
          { externalReviewId: { in: externalReviewIds } },
        ],
      },
    })

    const votesByRatingId = new Map<string, typeof votes>()
    const votesByExternalReviewId = new Map<string, typeof votes>()

    votes.forEach((vote) => {
      if (vote.ratingId) {
        const list = votesByRatingId.get(vote.ratingId) || []
        list.push(vote)
        votesByRatingId.set(vote.ratingId, list)
      } else if (vote.externalReviewId) {
        const list = votesByExternalReviewId.get(vote.externalReviewId) || []
        list.push(vote)
        votesByExternalReviewId.set(vote.externalReviewId, list)
      }
    })

    const formattedLocalReviews = tvRatings.map((rating) => {
      const localVotes = votesByRatingId.get(rating.id) || []
      const upVotes = localVotes.filter((v) => v.type === 'UP').length
      const downVotes = localVotes.filter((v) => v.type === 'DOWN').length

      return {
        id: rating.id,
        is_from_app_user: true,
        user_id: rating.user.id,
        author: rating.user.name,
        author_details: {
          avatar_user_path: rating.user.avatarUrl,
          rating: rating.rate,
        },
        content: rating.description,
        created_at: rating.createdAt,
        rating: rating.rate,
        votes: { up: upVotes, down: downVotes },
      }
    })

    const formattedExternalReviews = externalReviews.map((review) => {
      const extVotes = votesByExternalReviewId.get(review.id) || []
      const upVotes = extVotes.filter((v) => v.type === 'UP').length
      const downVotes = extVotes.filter((v) => v.type === 'DOWN').length

      return {
        id: review.id,
        is_from_app_user: false,
        author: review.author,
        author_details: {
          name: review.name,
          username: review.username,
          rating: review.rating,
          avatar_path: review.avatarPath,
        },
        content: review.content,
        created_at: review.createdAt,
        rating: review.rating,
        votes: { up: upVotes, down: downVotes },
      }
    })

    const mergedReviews = [
      ...formattedExternalReviews,
      ...formattedLocalReviews,
    ].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })

    const localVotesSummary = {
      count: tvRatings.length,
      average:
        tvRatings.reduce((sum, rating) => sum + rating.rate, 0) /
        (tvRatings.length || 1),
    }

    const tmdbVotes = {
      count: detail.vote_count || 0,
      average: detail.vote_average || 0,
    }

    const combinedVoteCount = tmdbVotes.count + localVotesSummary.count

    const combinedVoteAverage =
      combinedVoteCount > 0
        ? (tmdbVotes.average * tmdbVotes.count +
            localVotesSummary.average * localVotesSummary.count) /
          combinedVoteCount
        : 0

    const updatedDetail = {
      ...detail,
      vote_count: combinedVoteCount,
      vote_average: parseFloat(combinedVoteAverage.toFixed(1)),
    }

    res.status(200).json({
      data: {
        detail: updatedDetail,
        credits,
        reviews: { results: mergedReviews },
        similars,
        videos,
      },
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
