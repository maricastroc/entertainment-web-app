import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { getMovieDetail, getTvDetail } from '@/lib/tmdb'

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
    // Busca os filmes e séries salvos pelo usuário
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

    // Obtém os detalhes completos para cada filme
    const moviesWithDetails = await Promise.all(
      userWithMedias.savedMovies.map(async (movie) => {
        const response = await fetch(getMovieDetail(movie.id))
        return await response.json()
      }),
    )

    // Obtém os detalhes completos para cada série
    const seriesWithDetails = await Promise.all(
      userWithMedias.savedSeries.map(async (tv) => {
        const response = await fetch(getTvDetail(tv.id))
        return await response.json() // Retorna diretamente os details
      }),
    )

    return res.status(200).json({
      data: {
        savedMovies: moviesWithDetails,
        savedSeries: seriesWithDetails,
      },
    })
  } catch (error) {
    console.error('Error fetching saved media details:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
