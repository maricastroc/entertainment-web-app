import { prisma } from '@/lib/prisma'
import { getMovieDetail, getTvDetail } from '@/lib/tmdb'

export async function getSavedMedia(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      savedMovies: true,
      savedSeries: true,
    },
  })

  if (!user) {
    const error = new Error('User not found')
    ;(error as any).statusCode = 404
    throw error
  }

  const [savedMovies, savedSeries] = await Promise.all([
    Promise.all(
      user.savedMovies.map(async (movie) => {
        const response = await fetch(getMovieDetail(movie.id))
        return response.json()
      }),
    ),
    Promise.all(
      user.savedSeries.map(async (tv) => {
        const response = await fetch(getTvDetail(tv.id))
        return response.json()
      }),
    ),
  ])

  return { savedMovies, savedSeries }
}
