import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { createRating } from '@/services/rating.service'
import { handleServiceError } from '@/lib/api-error'

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

  const { movieId, seriesId, rate, description } = req.body

  if (!movieId && !seriesId) {
    return res.status(400).json({ message: 'Movie ID or TV ID is required' })
  }

  if (typeof rate !== 'number' || !description?.trim()) {
    return res.status(400).json({ message: 'Invalid input' })
  }

  try {
    const rating = await createRating({
      userId: String(session.user.id),
      movieId,
      seriesId,
      rate,
      description,
    })

    return res
      .status(201)
      .json({ message: 'Rating successfully created!', rating })
  } catch (error) {
    return handleServiceError(error, res)
  }
}
