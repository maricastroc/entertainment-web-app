import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { prisma } from '@/lib/prisma'

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

  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: String(session.user.id) },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({ data: user })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
