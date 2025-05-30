import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '../../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const userId = session.user.id
  const { movieId, seriesId, rate, description } = req.body

  if (!movieId && !seriesId) {
    return res.status(400).json({ message: 'Movie ID or TV ID is required' })
  }

  if (typeof rate !== 'number' || !description.trim()) {
    return res.status(400).json({ message: 'Invalid input' })
  }

  try {
    let media
    if (movieId) {
      media = await prisma.movie.findUnique({
        where: { id: movieId },
      })
    }

    if (seriesId) {
      media = await prisma.series.findUnique({
        where: { id: seriesId },
      })
    }

    if (!media) {
      return res.status(404).json({
        message: movieId ? 'Movie not found' : 'Series not found',
      })
    }

    const existingRating = await prisma.rating.findFirst({
      where: {
        userId: String(userId),
        movieId: movieId || undefined,
        seriesId: seriesId || undefined,
      },
    })

    if (!existingRating) {
      return res.status(404).json({ message: 'Rating not found' })
    }

    const updatedRating = await prisma.rating.update({
      where: { id: existingRating.id },
      data: {
        rate,
        description,
      },
    })

    return res.status(200).json({
      message: 'Rating successfully updated!',
      rating: updatedRating,
    })
  } catch (error) {
    console.error('Error updating rating:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
