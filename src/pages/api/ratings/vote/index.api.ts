import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../../auth/[...nextauth].api'
import { voteRating } from '@/services/rating.service'
import { handleServiceError } from '@/lib/api-error'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await getServerSession(req, res, buildNextAuthOptions(req, res))

  if (!session?.user) {
    return res.status(401).json({ error: 'You are not authenticated' })
  }

  const { ratingId, externalReviewId, type } = req.body

  if (!['UP', 'DOWN'].includes(type)) {
    return res.status(400).json({ error: 'Invalid vote type' })
  }

  if (!ratingId && !externalReviewId) {
    return res.status(400).json({ error: 'ratingId or externalReviewId is required' })
  }

  try {
    const result = await voteRating({
      userId: session.user.id as string,
      ratingId,
      externalReviewId,
      type,
    })

    if (result.deleted) {
      return res.status(200).json({ message: 'Vote successfully deleted!' })
    }

    const status = result.isNew ? 201 : 200
    return res.status(status).json({
      message: 'Vote successfully registered!',
      vote: result.vote,
    })
  } catch (error) {
    return handleServiceError(error, res)
  }
}
