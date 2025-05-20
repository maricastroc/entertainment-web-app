/* eslint-disable @typescript-eslint/no-explicit-any */
import handler from '@/pages/api/ratings/index.api'
import { createMocks } from 'node-mocks-http'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}))

jest.mock('@/lib/prisma', () => ({
  prisma: {
    movie: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    series: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    rating: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}))

describe('POST /api/rating/create', () => {
  const mockSession = {
    user: { id: 'user-123' },
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return 405 for methods other than POST', async () => {
    const { req, res } = createMocks({ method: 'GET' })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Method Not Allowed',
    })
  })

  it('should return 401 if session is not present', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(null)

    const { req, res } = createMocks({ method: 'POST' })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(401)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Unauthorized' })
  })

  it('should return 400 if neither movieId nor seriesId is provided', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)

    const { req, res } = createMocks({
      method: 'POST',
      body: { rate: 5, description: 'Great!' },
    })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Movie ID or TV ID is required',
    })
  })

  it('should return 400 if rate or description is invalid', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)

    const { req, res } = createMocks({
      method: 'POST',
      body: { movieId: 1, rate: 'bad', description: '' },
    })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Invalid input' })
  })

  it('should create a new rating for movie if no existing rating', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    ;(prisma.movie.findUnique as jest.Mock).mockResolvedValue({ id: 1 })
    ;(prisma.rating.findFirst as jest.Mock).mockResolvedValue(null)
    ;(prisma.rating.create as jest.Mock).mockResolvedValue({
      id: 'rating-1',
      rate: 5,
      description: 'Awesome movie!',
    })

    const { req, res } = createMocks({
      method: 'POST',
      body: { movieId: 1, rate: 5, description: 'Awesome movie!' },
    })

    await handler(req as any, res as any)

    expect(prisma.rating.create).toHaveBeenCalled()
    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toMatchObject({
      message: 'Rating successfully created!',
      rating: { id: 'rating-1', rate: 5, description: 'Awesome movie!' },
    })
  })

  it('should return 409 if user already rated the media', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    ;(prisma.movie.findUnique as jest.Mock).mockResolvedValue({ id: 1 })
    ;(prisma.rating.findFirst as jest.Mock).mockResolvedValue({
      id: 'existing-rating',
    })

    const { req, res } = createMocks({
      method: 'POST',
      body: { movieId: 1, rate: 4, description: 'Nice movie' },
    })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(409)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'User already rated this media',
    })
  })
})
