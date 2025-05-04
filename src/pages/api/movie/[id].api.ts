/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import {
  getMovieCasts,
  getMovieDetail,
  getMovieReviews,
  getMovieSimilars,
  getMovieVideos,
} from '../../../lib/tmdb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  try {
    const [detailRes, creditsRes, reviewsRes, similarsRes, videosRes] =
      await Promise.all([
        fetch(getMovieDetail(id as string)),
        fetch(getMovieCasts(id as string)),
        fetch(getMovieReviews(id as string)),
        fetch(getMovieSimilars(id as string)),
        fetch(getMovieVideos(id as string)),
      ])

    const [detail, credits, reviewsData, similars, videos] = await Promise.all([
      detailRes.json(),
      creditsRes.json(),
      reviewsRes.json(),
      similarsRes.json(),
      videosRes.json(),
    ])

    const movieRatings = await prisma.rating.findMany({
      where: { movieId: id as string },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true },
        },
      },
    })

    const formattedLocalReviews = movieRatings.map((rating) => ({
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
    }))

    const mergedReviews = [...reviewsData.results, ...formattedLocalReviews]

    mergedReviews.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })

    const localVotes = {
      count: movieRatings.length,
      average:
        movieRatings.reduce((sum, rating) => sum + rating.rate, 0) /
        (movieRatings.length || 1), // Evita divisão por zero
    }

    const tmdbVotes = {
      count: detail.vote_count || 0,
      average: detail.vote_average || 0,
    }

    const combinedVoteCount = tmdbVotes.count + localVotes.count

    const combinedVoteAverage =
      combinedVoteCount > 0
        ? (tmdbVotes.average * tmdbVotes.count +
            localVotes.average * localVotes.count) /
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
        reviews: { ...reviewsData, results: mergedReviews },
        similars,
        videos,
      },
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
