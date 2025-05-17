import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { buildNextAuthOptions } from '../../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
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
    mediaId: z.string().min(1, 'Series ID is required'),
  })

  try {
    const { mediaId } = schema.parse(req.body)
    const userId = session.user.id

    const seriesExists = await prisma.series.findUnique({
      where: { id: mediaId },
    })

    if (!seriesExists) {
      await prisma.series.create({
        data: { id: mediaId },
      })
    }

    const userWithSeries = await prisma.user.findUnique({
      where: { id: String(userId) },
      include: {
        savedSeries: { where: { id: mediaId } },
      },
    })

    if (req.method === 'POST') {
      if (userWithSeries?.savedSeries.length) {
        return res.status(400).json({ message: 'TV Show already saved' })
      }

      await prisma.user.update({
        where: { id: String(userId) },
        data: {
          savedSeries: {
            connect: { id: mediaId },
          },
        },
      })

      return res.status(201).json({ message: 'TV Show added to bookmarks!' })
    } else if (req.method === 'DELETE') {
      if (!userWithSeries?.savedSeries.length) {
        return res.status(400).json({ message: 'TV Show not saved' })
      }

      await prisma.user.update({
        where: { id: String(userId) },
        data: {
          savedSeries: {
            disconnect: { id: mediaId },
          },
        },
      })

      return res
        .status(200)
        .json({ message: 'TV Show removed from bookmarks!' })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}
