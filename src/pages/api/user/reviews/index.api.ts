import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '../../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
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

  try {
    const userId = String(session.user.id)

    const userRatings = await prisma.rating.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      select: {
        id: true,
        rate: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        movieId: true,
        seriesId: true,
        mediaTitle: true,
        mediaPoster: true,
        mediaReleaseDate: true,
        movie: {
          select: {
            id: true,
            createdAt: true,
          },
        },
        series: {
          select: {
            id: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const formattedRatings = userRatings.map((rating) => ({
      id: rating.id,
      rate: rating.rate,
      description: rating.description,
      mediaTitle: rating.mediaTitle,
      mediaPoster: rating.mediaPoster,
      mediaReleaseDate: rating.mediaReleaseDate,
      created_at: rating.createdAt,
      updated_at: rating.updatedAt,
      media_type: rating.movieId ? 'movie' : 'series',
      media_id: rating.movieId || rating.seriesId,
    }))

    return res.status(200).json({
      data: {
        formattedRatings,
      },
    })
  } catch (error) {
    console.error('Error fetching user reviews:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
