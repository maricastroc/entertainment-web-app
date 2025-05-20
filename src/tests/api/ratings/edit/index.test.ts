/* eslint-disable @typescript-eslint/no-explicit-any */
import handler from '@/pages/api/ratings/edit/index.api'
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
      update: jest.fn(),
    },
  },
}))

describe('PUT /api/rating/edit', () => {
  const mockSession = {
    user: { id: 'user-123' },
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return 405 for methods other than PUT', async () => {
    const { req, res } = createMocks({ method: 'GET' })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Method Not Allowed',
    })
  })

  it('should return 401 if session is not present', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(null)

    const { req, res } = createMocks({ method: 'PUT' })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(401)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Unauthorized' })
  })

  it('should return 400 if neither movieId nor seriesId is provided', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)

    const { req, res } = createMocks({
      method: 'PUT',
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
      method: 'PUT',
      body: { movieId: 1, rate: 'bad', description: '' },
    })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Invalid input' })
  })

  it('should return 404 error if movie does not exist', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    ;(prisma.movie.findUnique as jest.Mock).mockResolvedValue(null)

    const { req, res } = createMocks({
      method: 'PUT',
      body: { movieId: 1, rate: 5, description: 'Awesome movie!' },
    })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Movie not found',
    })
  })

  it('should return 404 error if tv series does not exist', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    ;(prisma.series.findUnique as jest.Mock).mockResolvedValue(null)

    const { req, res } = createMocks({
      method: 'PUT',
      body: { seriesId: 1, rate: 5, description: 'Awesome show!' },
    })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Series not found',
    })
  })

  it('should return 404 error if rating does not exist', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    ;(prisma.rating.findFirst as jest.Mock).mockResolvedValue(null)
    ;(prisma.series.findUnique as jest.Mock).mockResolvedValue({ id: 1 })

    const { req, res } = createMocks({
      method: 'PUT',
      body: { seriesId: 1, rate: 5, description: 'Awesome show!' },
    })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Rating not found',
    })
  })

  it('should be able to edit an existing rating successfully', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    ;(prisma.series.findUnique as jest.Mock).mockResolvedValue({ id: 1 })
    ;(prisma.rating.findFirst as jest.Mock).mockResolvedValue({
      id: 'existing-rating',
    })
    ;(prisma.rating.update as jest.Mock).mockResolvedValue({
      id: 'existing-rating',
      rate: 5,
      description: 'Awesome show!',
    })

    const { req, res } = createMocks({
      method: 'PUT',
      body: { seriesId: 1, rate: 5, description: 'Awesome show!' },
    })

    await handler(req as any, res as any)

    expect(prisma.rating.update).toHaveBeenCalledWith({
      where: { id: 'existing-rating' },
      data: { rate: 5, description: 'Awesome show!' },
    })

    expect(res._getStatusCode()).toBe(200)

    expect(JSON.parse(res._getData())).toMatchObject({
      message: 'Rating successfully updated!',
      rating: { id: 'existing-rating', rate: 5, description: 'Awesome show!' },
    })
  })
})
