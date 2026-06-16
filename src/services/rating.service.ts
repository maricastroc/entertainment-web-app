/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prisma } from '@/lib/prisma'
import { ApiError } from '@/lib/api-error'
import { getMovieDetail, getTvDetail } from '@/lib/tmdb'

interface CreateRatingParams {
  userId: string
  movieId?: string
  seriesId?: string
  rate: number
  description: string
}

interface UpdateRatingParams {
  userId: string
  movieId?: string
  seriesId?: string
  rate: number
  description: string
}

interface DeleteRatingParams {
  userId: string
  movieId?: string
  seriesId?: string
}

interface VoteParams {
  userId: string
  ratingId?: string
  externalReviewId?: string
  type: 'UP' | 'DOWN'
}

async function fetchMediaDetail(movieId?: string, seriesId?: string) {
  if (movieId) {
    const response = await fetch(getMovieDetail(movieId))
    return response.json()
  }
  if (seriesId) {
    const response = await fetch(getTvDetail(seriesId))
    return response.json()
  }
  return null
}

async function ensureMediaExists(movieId?: string, seriesId?: string) {
  if (movieId) {
    const existing = await prisma.movie.findUnique({ where: { id: movieId } })
    if (!existing) await prisma.movie.create({ data: { id: movieId } })
  }
  if (seriesId) {
    const existing = await prisma.series.findUnique({ where: { id: seriesId } })
    if (!existing) await prisma.series.create({ data: { id: seriesId } })
  }
}

export async function createRating({
  userId,
  movieId,
  seriesId,
  rate,
  description,
}: CreateRatingParams) {
  await ensureMediaExists(movieId, seriesId)

  const existingRating = await prisma.rating.findFirst({
    where: { userId, movieId, seriesId },
  })

  if (existingRating) {
    throw new ApiError('User already rated this media', 409)
  }

  const detail = await fetchMediaDetail(movieId, seriesId)

  return prisma.rating.create({
    data: {
      userId,
      movieId,
      seriesId,
      rate,
      description,
      mediaTitle: detail?.name ?? detail?.title ?? null,
      mediaPoster: detail?.poster_path ?? detail?.backdrop_path ?? null,
      mediaReleaseDate: detail?.release_date
        ? new Date(detail.release_date)
        : detail?.first_air_date
        ? new Date(detail.first_air_date)
        : null,
    },
  })
}

export async function updateRating({
  userId,
  movieId,
  seriesId,
  rate,
  description,
}: UpdateRatingParams) {
  const media = movieId
    ? await prisma.movie.findUnique({ where: { id: movieId } })
    : await prisma.series.findUnique({ where: { id: seriesId! } })

  if (!media) {
    throw new ApiError(movieId ? 'Movie not found' : 'Series not found', 404)
  }

  const existingRating = await prisma.rating.findFirst({
    where: { userId, movieId, seriesId },
  })

  if (!existingRating) {
    throw new ApiError('Rating not found', 404)
  }

  return prisma.rating.update({
    where: { id: existingRating.id },
    data: { rate, description },
  })
}

export async function deleteRating({
  userId,
  movieId,
  seriesId,
}: DeleteRatingParams) {
  const media = movieId
    ? await prisma.movie.findUnique({ where: { id: movieId } })
    : await prisma.series.findUnique({ where: { id: seriesId! } })

  if (!media) {
    throw new ApiError(movieId ? 'Movie not found' : 'Series not found', 404)
  }

  const existingRating = await prisma.rating.findFirst({
    where: { userId, movieId, seriesId },
  })

  if (!existingRating) {
    throw new ApiError('Rating not found', 404)
  }

  if (existingRating.userId !== userId) {
    throw new ApiError('You are not allowed to delete this rating', 403)
  }

  await prisma.rating.delete({ where: { id: existingRating.id } })
}

export async function voteRating({
  userId,
  ratingId,
  externalReviewId,
  type,
}: VoteParams) {
  const existingVote = ratingId
    ? await prisma.vote.findUnique({
        where: { userId_ratingId: { userId, ratingId } },
      })
    : await prisma.vote.findUnique({
        where: {
          userId_externalReviewId: {
            userId,
            externalReviewId: externalReviewId!,
          },
        },
      })

  if (existingVote) {
    if (existingVote.type === type) {
      await prisma.vote.delete({ where: { id: existingVote.id } })
      return { deleted: true, isNew: false }
    }

    const updatedVote = await prisma.vote.update({
      where: { id: existingVote.id },
      data: { type },
    })
    return { deleted: false, isNew: false, vote: updatedVote }
  }

  const newVote = await prisma.vote.create({
    data: { userId, ratingId, externalReviewId, type },
  })
  return { deleted: false, isNew: true, vote: newVote }
}
