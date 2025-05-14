/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '../../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session || !session.user) {
    return res.status(401).json({ error: 'You are not authenticated' })
  }

  const userId = session.user.id as string
  const { ratingId, externalReviewId, type } = req.body

  if (!['UP', 'DOWN'].includes(type)) {
    return res.status(400).json({ error: 'Invalid vote type' })
  }

  if (!ratingId && !externalReviewId) {
    return res
      .status(400)
      .json({ error: 'ratingId or externalReviewId is required' })
  }

  try {
    let existingVote = null

    if (ratingId) {
      existingVote = await prisma.vote.findUnique({
        where: {
          userId_ratingId: {
            userId,
            ratingId,
          },
        },
      })
    } else if (externalReviewId) {
      existingVote = await prisma.vote.findUnique({
        where: {
          userId_externalReviewId: {
            userId,
            externalReviewId,
          },
        },
      })
    }

    if (existingVote) {
      if (existingVote.type === type) {
        await prisma.vote.delete({ where: { id: existingVote.id } })
        return res.status(200).json({ message: 'Vote successfully deleted!' })
      } else {
        const updatedVote = await prisma.vote.update({
          where: { id: existingVote.id },
          data: { type },
        })
        return res
          .status(200)
          .json({ message: 'Vote successfully registered!', vote: updatedVote })
      }
    }

    const newVote = await prisma.vote.create({
      data: {
        userId,
        ratingId,
        externalReviewId,
        type,
      },
    })

    return res
      .status(201)
      .json({ message: 'Vote successfully registered!', vote: newVote })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
