import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { buildNextAuthOptions } from '../../auth/[...nextauth].api'

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

  const schema = z.object({
    mediaId: z.string().min(1, 'Movie ID is required'),
  })

  try {
    const { mediaId } = schema.parse(req.body)
    const userId = session.user.id

    const movieExists = await prisma.movie.findUnique({
      where: { id: mediaId },
    })

    if (!movieExists) {
      await prisma.movie.create({
        data: { id: mediaId },
      })
    }

    const userWithMovie = await prisma.user.findUnique({
      where: { id: String(userId) },
      include: {
        savedMovies: { where: { id: mediaId } },
      },
    })

    if (userWithMovie?.savedMovies.length) {
      return res.status(400).json({ message: 'Movie already saved' })
    }

    await prisma.user.update({
      where: { id: String(userId) },
      data: {
        savedMovies: {
          connect: { id: mediaId },
        },
      },
    })

    return res.status(201).json({ message: 'Movie added to saved list' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}
