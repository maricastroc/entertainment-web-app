/* eslint-disable @typescript-eslint/no-explicit-any */
import handler from '@/pages/api/ratings/delete/index.api'
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
      delete: jest.fn(),
    },
  },
}))

describe('DELETE /api/rating/delete', () => {
  const mockSession = {
    user: { id: 'user-123' },
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return 405 for methods other than DELETE', async () => {
    const { req, res } = createMocks({ method: 'GET' })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Method Not Allowed',
    })
  })

  it('should return 401 if session is not present', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(null)

    const { req, res } = createMocks({ method: 'DELETE' })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(401)
    expect(JSON.parse(res._getData())).toEqual({ message: 'Unauthorized' })
  })

  it('should return 400 if neither movieId nor seriesId is provided', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)

    const { req, res } = createMocks({
      method: 'DELETE',
      body: { rate: 5, description: 'Great!' },
    })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Movie ID or TV ID is required',
    })
  })

  it('should return 404 error if movie does not exist', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    ;(prisma.movie.findUnique as jest.Mock).mockResolvedValue(null)

    const { req, res } = createMocks({
      method: 'DELETE',
      body: { movieId: 1 },
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
      method: 'DELETE',
      body: { seriesId: 1 },
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
      method: 'DELETE',
      body: { seriesId: 1, rate: 5 },
    })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(404)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Rating not found',
    })
  })

  it('should return 403 if user is not the owner of the rating', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    ;(prisma.series.findUnique as jest.Mock).mockResolvedValue({ id: 1 })
    ;(prisma.rating.findFirst as jest.Mock).mockResolvedValue({
      id: 'existing-rating',
      userId: 'user-456',
    })

    const { req, res } = createMocks({
      method: 'DELETE',
      body: { seriesId: 1 },
    })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(403)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'You are not allowed to delete this rating',
    })
  })

  it('should be able to delete an existing rating successfully', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(mockSession)
    ;(prisma.series.findUnique as jest.Mock).mockResolvedValue({ id: 1 })
    ;(prisma.rating.findFirst as jest.Mock).mockResolvedValue({
      id: 'existing-rating',
      userId: 'user-123',
    })
    ;(prisma.rating.delete as jest.Mock).mockResolvedValue({
      id: 'existing-rating',
    })

    const { req, res } = createMocks({
      method: 'DELETE',
      body: { seriesId: 1 },
    })

    await handler(req as any, res as any)

    expect(prisma.rating.delete).toHaveBeenCalledWith({
      where: { id: 'existing-rating' },
    })

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Rating deleted successfully',
    })
  })
})
