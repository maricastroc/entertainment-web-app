import handler from '@/pages/api/user/index.api'
import { createRequest, createResponse } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
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

jest.mock('@/pages/api/auth/[...nextauth].api', () => ({
  buildNextAuthOptions: jest.fn(() => ({})),
}))

describe('GET /api/user', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 405 if method is not GET', async () => {
    const req = createRequest({ method: 'POST' })
    const res = createResponse()

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(res._getStatusCode()).toBe(405)
    expect(res._getJSONData()).toEqual({ message: 'Method Not Allowed' })
  })

  it('should return 401 if session is not found', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce(null)

    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(res._getStatusCode()).toBe(401)
    expect(res._getJSONData()).toEqual({ message: 'Unauthorized' })
  })

  it('should return 404 if user is not found', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: '1' },
    })
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null)

    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(res._getStatusCode()).toBe(404)
    expect(res._getJSONData()).toEqual({ message: 'User not found' })
  })

  it('should return logged user data', async () => {
    const mockUser = {
      id: '1',
      name: 'Jon Doe',
      email: 'jondoe@email.com',
      avatarUrl: 'joe_avatar',
    }

    ;(getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: '1' },
    })
    ;(prisma.user.findUnique as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockUser),
    )

    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
      },
    })
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({ data: mockUser })
  })

  it('should return 500 on database error', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: '1' },
    })
    ;(prisma.user.findUnique as jest.Mock).mockRejectedValueOnce(
      new Error('Database error'),
    )

    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(res._getStatusCode()).toBe(500)
    expect(res._getJSONData()).toEqual({ message: 'Internal Server Error' })
  })
})
