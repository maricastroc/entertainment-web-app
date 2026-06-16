import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { getSavedMedia } from '@/services/profile.service'
import { handleServiceError } from '@/lib/api-error'

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
    const data = await getSavedMedia(String(session.user.id))
    return res.status(200).json({ data })
  } catch (error) {
    return handleServiceError(error, res)
  }
}
