import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

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

  const userId = session.user.id

  try {
    const userWithMedias = await prisma.user.findUnique({
      where: { id: String(userId) },
      include: {
        savedMovies: true,
        savedSeries: true,
      },
    })

    if (!userWithMedias) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({
      data: {
        savedMovies: userWithMedias.savedMovies,
        savedSeries: userWithMedias.savedSeries,
      },
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
