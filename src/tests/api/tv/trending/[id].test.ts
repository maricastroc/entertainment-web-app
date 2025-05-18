/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks } from 'node-mocks-http'
import { getUrl2 } from '@/lib/tmdb'
import handler from '@/pages/api/tv/trending/[id].api'

jest.mock('@/lib/tmdb', () => ({
  getUrl2: jest
    .fn()
    .mockReturnValue('https://api.themoviedb.org/3/tv/trending'),
  trendingTvDay: 'trending/tv/day',
}))

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [{ id: 1, title: 'TV 1' }],
          total_pages: 10,
          total_results: 200,
        }),
    }),
  ) as jest.Mock
})

afterEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('GET /api/tv/trending/[id]', () => {
  it('should return trending series with correct structure', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '1' },
    })

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(getUrl2).toHaveBeenCalledWith('trending/tv/day', '1')
    expect(getUrl2).toHaveBeenCalledTimes(1)

    const data = JSON.parse(res._getData())
    expect(res._getStatusCode()).toBe(200)
    expect(data).toEqual({
      results: [{ id: 1, title: 'TV 1' }],
      total_pages: 10,
      total_results: 200,
    })
  })

  it('should validate the HTTP method', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: { id: '1' },
    })

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Method not allowed.',
    })
  })
})
