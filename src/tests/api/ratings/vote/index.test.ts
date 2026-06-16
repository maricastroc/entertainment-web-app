// __tests__/api/vote.test.ts
import handler from '@/pages/api/ratings/vote/index.api'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

jest.mock('next-auth')
jest.mock('@/lib/prisma', () => ({
  prisma: {
    vote: {
      findUnique: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    },
  },
}))

const mockGetServerSession = getServerSession as jest.Mock

const mockPrismaVote = prisma.vote as unknown as {
  findUnique: jest.Mock
  delete: jest.Mock
  update: jest.Mock
  create: jest.Mock
}

const mockRes = () => {
  const res = {} as NextApiResponse
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('API Route: /api/vote', () => {
  const userId = 'user-id-123'
  const defaultSession = {
    user: { id: userId },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 405 if method is not POST', async () => {
    const req = { method: 'GET' } as unknown as NextApiRequest
    const res = mockRes()

    await handler(req as unknown as NextApiRequest, res)

    expect(res.status).toHaveBeenCalledWith(405)

    expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' })
  })

  it('should return 401 if user is not authenticated', async () => {
    const req = { method: 'POST' } as unknown as NextApiRequest
    const res = mockRes()

    mockGetServerSession.mockResolvedValue(null)

    await handler(req as unknown as NextApiRequest, res)

    expect(res.status).toHaveBeenCalledWith(401)

    expect(res.json).toHaveBeenCalledWith({
      error: 'You are not authenticated',
    })
  })

  it('should return 400 if vote type is invalid', async () => {
    const req = {
      method: 'POST',
      body: { type: 'INVALID' },
    }
    const res = mockRes()

    mockGetServerSession.mockResolvedValue(defaultSession)

    await handler(req as unknown as NextApiRequest, res)

    expect(res.status).toHaveBeenCalledWith(400)

    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid vote type' })
  })

  it('should return 400 if neither ratingId nor externalReviewId is provided', async () => {
    const req = {
      method: 'POST',
      body: { type: 'UP' },
    }
    const res = mockRes()

    mockGetServerSession.mockResolvedValue(defaultSession)

    await handler(req as unknown as NextApiRequest, res)

    expect(res.status).toHaveBeenCalledWith(400)

    expect(res.json).toHaveBeenCalledWith({
      error: 'ratingId or externalReviewId is required',
    })
  })

  it('should delete the vote if same type already exists', async () => {
    mockGetServerSession.mockResolvedValue(defaultSession)

    mockPrismaVote.findUnique.mockResolvedValue({ id: 'vote-1', type: 'UP' })

    mockPrismaVote.delete.mockResolvedValue({})

    const req = {
      method: 'POST',
      body: { type: 'UP', ratingId: 'rating-123' },
    }
    const res = mockRes()

    await handler(req as unknown as NextApiRequest, res)

    expect(mockPrismaVote.delete).toHaveBeenCalledWith({
      where: { id: 'vote-1' },
    })

    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith({
      message: 'Vote successfully deleted!',
    })
  })

  it('should update vote if existing vote has different type', async () => {
    mockGetServerSession.mockResolvedValue(defaultSession)

    mockPrismaVote.findUnique.mockResolvedValue({ id: 'vote-1', type: 'UP' })

    mockPrismaVote.update.mockResolvedValue({ id: 'vote-1', type: 'DOWN' })

    const req = {
      method: 'POST',
      body: { type: 'DOWN', ratingId: 'rating-123' },
    }

    const res = mockRes()

    await handler(req as unknown as NextApiRequest, res)

    expect(mockPrismaVote.update).toHaveBeenCalledWith({
      where: { id: 'vote-1' },
      data: { type: 'DOWN' },
    })

    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith({
      message: 'Vote successfully registered!',
      vote: { id: 'vote-1', type: 'DOWN' },
    })
  })

  it('should create new vote if no existing vote', async () => {
    mockGetServerSession.mockResolvedValue(defaultSession)

    mockPrismaVote.findUnique.mockResolvedValue(null)

    mockPrismaVote.create.mockResolvedValue({
      id: 'vote-2',
      type: 'UP',
      userId,
      externalReviewId: 'ext-review-1',
    })

    const req = {
      method: 'POST',
      body: { type: 'UP', externalReviewId: 'ext-review-1' },
    }

    const res = mockRes()

    await handler(req as unknown as NextApiRequest, res)

    expect(mockPrismaVote.create).toHaveBeenCalledWith({
      data: {
        userId,
        type: 'UP',
        ratingId: undefined,
        externalReviewId: 'ext-review-1',
      },
    })

    expect(res.status).toHaveBeenCalledWith(201)

    expect(res.json).toHaveBeenCalledWith({
      message: 'Vote successfully registered!',
      vote: {
        id: 'vote-2',
        type: 'UP',
        userId,
        externalReviewId: 'ext-review-1',
      },
    })
  })

  it('should handle server errors gracefully', async () => {
    const req = {
      method: 'POST',
      body: { type: 'UP', ratingId: 'rating-123' },
    }
    const res = mockRes()

    mockGetServerSession.mockResolvedValue(defaultSession)
    mockPrismaVote.findUnique.mockRejectedValue(new Error('DB error'))

    await handler(req as unknown as NextApiRequest, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' })
  })
})
