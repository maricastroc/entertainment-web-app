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

jest.mock('@/pages/api/auth/[...nextauth].api', () => ({
  buildNextAuthOptions: jest.fn(() => ({})),
}))

describe('user-media API handler', () => {
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

  it('should return 401 if session is not found', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce(null)

    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await handler(req, res)

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

    await handler(req, res)

    expect(res._getStatusCode()).toBe(404)
    expect(res._getJSONData()).toEqual({ message: 'User not found' })
  })

  it('should return 200 with saved media', async () => {
    const mockUser = {
      savedMovies: [{ id: 1, title: 'Movie' }],
      savedSeries: [{ id: 2, title: 'Series' }],
    }

    ;(getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: '1' },
    })
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockUser)

    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({ data: mockUser })
  })

  it('should return 500 if there is an error', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: '1' },
    })
    ;(prisma.user.findUnique as jest.Mock).mockRejectedValueOnce(
      new Error('DB error'),
    )

    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(res._getJSONData()).toEqual({ message: 'Internal server error' })
  })
})
