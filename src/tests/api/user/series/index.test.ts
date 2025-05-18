import handler from '@/pages/api/user/series/index.api'
import { createRequest, createResponse } from 'node-mocks-http'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}))

jest.mock('@/lib/prisma', () => ({
  prisma: {
    series: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}))

jest.mock('@/pages/api/auth/[...nextauth].api', () => ({
  buildNextAuthOptions: jest.fn(() => ({})),
}))

describe('user-media API handler', () => {
  const mockUserId = 'user-123'

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 405 if method is not POST or DELETE', async () => {
    const req = createRequest({ method: 'GET' })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(res._getJSONData()).toEqual({ message: 'Method Not Allowed' })
  })

  it('should return 401 if no session', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce(null)

    const req = createRequest({ method: 'POST', body: { mediaId: '1' } })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(401)
    expect(res._getJSONData()).toEqual({ message: 'Unauthorized' })
  })

  it('should return 400 if series is already saved (POST)', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: mockUserId },
    })
    ;(prisma.series.findUnique as jest.Mock).mockResolvedValueOnce({ id: '1' })
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
      savedSeries: [{ id: '1' }],
    })

    const req = createRequest({ method: 'POST', body: { mediaId: '1' } })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(res._getJSONData()).toEqual({ message: 'Series already saved' })
  })

  it('should save series (POST)', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: mockUserId },
    })
    ;(prisma.series.findUnique as jest.Mock).mockResolvedValueOnce(null)
    ;(prisma.series.create as jest.Mock).mockResolvedValueOnce({ id: '1' })
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
      savedSeries: [],
    })

    const req = createRequest({ method: 'POST', body: { mediaId: '1' } })
    const res = createResponse()

    await handler(req, res)

    expect(prisma.series.create).toHaveBeenCalledWith({ data: { id: '1' } })
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: mockUserId },
      data: { savedSeries: { connect: { id: '1' } } },
    })
    expect(res._getStatusCode()).toBe(201)
    expect(res._getJSONData()).toEqual({
      message: 'Series added to bookmarks!',
    })
  })

  it('should return 400 if series not saved (DELETE)', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: mockUserId },
    })
    ;(prisma.series.findUnique as jest.Mock).mockResolvedValueOnce({ id: '1' })
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
      savedSeries: [],
    })

    const req = createRequest({ method: 'DELETE', body: { mediaId: '1' } })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(res._getJSONData()).toEqual({ message: 'Series not saved' })
  })

  it('should remove series (DELETE)', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: mockUserId },
    })
    ;(prisma.series.findUnique as jest.Mock).mockResolvedValueOnce({ id: '1' })
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
      savedSeries: [{ id: '1' }],
    })

    const req = createRequest({ method: 'DELETE', body: { mediaId: '1' } })
    const res = createResponse()

    await handler(req, res)

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: mockUserId },
      data: { savedSeries: { disconnect: { id: '1' } } },
    })
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({
      message: 'Series removed from bookmarks!',
    })
  })

  it('should return 400 if mediaId is missing', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: mockUserId },
    })

    const req = createRequest({ method: 'POST', body: {} })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(res._getJSONData()).toEqual({ message: 'Required' })
  })

  it('should return 500 on internal error', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: mockUserId },
    })
    ;(prisma.series.findUnique as jest.Mock).mockRejectedValueOnce(
      new Error('DB Error'),
    )

    const req = createRequest({ method: 'POST', body: { mediaId: '1' } })
    const res = createResponse()

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(res._getJSONData()).toEqual({ message: 'Internal server error' })
  })
})
