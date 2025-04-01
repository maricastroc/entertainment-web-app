import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
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

      if (!media) {
        media = await prisma.movie.create({
          data: {
            id: movieId,
          },
        })
      }
    }

    if (seriesId) {
      media = await prisma.series.findUnique({
        where: { id: seriesId },
      })

      if (!media) {
        media = await prisma.series.create({
          data: {
            id: seriesId,
          },
        })
      }
    }

    const existingRating = await prisma.rating.findFirst({
      where: {
        userId: String(userId),
        movieId: movieId || undefined,
        seriesId: seriesId || undefined,
      },
    })

    if (existingRating) {
      return res.status(409).json({ message: 'User already rated this media' })
    }

    const newRating = await prisma.rating.create({
      data: {
        userId: String(userId),
        movieId: movieId || undefined,
        seriesId: seriesId || undefined,
        rate,
        description,
      },
    })

    return res
      .status(201)
      .json({ message: 'Rating created successfully', rating: newRating })
  } catch (error) {
    console.error('Error creating rating:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
