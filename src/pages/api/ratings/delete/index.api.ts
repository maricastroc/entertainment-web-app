import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '../../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
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

  const { movieId, seriesId } = req.body

  if (!movieId && !seriesId) {
    return res.status(400).json({ message: 'Movie ID or TV ID is required' })
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
        message: movieId ? 'Movie not found' : 'TV show not found',
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

    if (existingRating.userId !== String(userId)) {
      return res
        .status(403)
        .json({ message: 'You are not allowed to delete this rating' })
    }

    await prisma.rating.delete({
      where: { id: existingRating.id },
    })

    return res.status(200).json({ message: 'Rating deleted successfully' })
  } catch (error) {
    console.error('Error deleting rating:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
