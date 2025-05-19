import handler from '@/pages/api/profile/index.api'
import { createRequest, createResponse } from 'node-mocks-http'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}))

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}))

jest.mock('@/lib/tmdb', () => ({
  getMovieDetail: jest.fn((id) => `https://api.tmdb.org/movie/${id}`),
  getTvDetail: jest.fn((id) => `https://api.tmdb.org/tv/${id}`),
}))

jest.mock('@/pages/api/auth/[...nextauth].api', () => ({
  buildNextAuthOptions: jest.fn(() => ({})),
}))

global.fetch = jest.fn()

describe('GET /api/profile', () => {
  const mockUserId = 'user-123'
  const mockSession = {
    user: { id: mockUserId },
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 405 if method is not GET', async () => {
    const req = createRequest({ method: 'POST' })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(res._getJSONData()).toEqual({ message: 'Method Not Allowed' })
  })

  it('should return 401 if no session', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce(null)

    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(401)
    expect(res._getJSONData()).toEqual({ message: 'Unauthorized' })
  })

  it('should return 404 if user not found', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce(mockSession)
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null)

    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(404)
    expect(res._getJSONData()).toEqual({ message: 'User not found' })
  })

  it('should return user saved media with details', async () => {
    const mockUser = {
      id: mockUserId,
      savedMovies: [{ id: 'movie-1' }, { id: 'movie-2' }],
      savedSeries: [{ id: 'tv-1' }],
    }

    const mockMovieDetails = { id: 'movie-1', title: 'Movie 1' }
    const mockTvDetails = { id: 'tv-1', name: 'TV Show 1' }

    ;(getServerSession as jest.Mock).mockResolvedValueOnce(mockSession)
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockUser)
    ;(fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockMovieDetails),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockMovieDetails),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockTvDetails),
      })

    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({
      data: {
        savedMovies: [mockMovieDetails, mockMovieDetails],
        savedSeries: [mockTvDetails],
      },
    })

    expect(fetch).toHaveBeenCalledWith('https://api.tmdb.org/movie/movie-1')
    expect(fetch).toHaveBeenCalledWith('https://api.tmdb.org/movie/movie-2')
    expect(fetch).toHaveBeenCalledWith('https://api.tmdb.org/tv/tv-1')
  })

  it('should return 500 on internal error', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce(mockSession)
    ;(prisma.user.findUnique as jest.Mock).mockRejectedValueOnce(
      new Error('Database error'),
    )

    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(res._getJSONData()).toEqual({ message: 'Internal server error' })
  })
})
