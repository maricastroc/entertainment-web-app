/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import handler from '@/pages/api/person/[id].api'
import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks } from 'node-mocks-http'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    person: {
      upsert: jest
        .fn()
        .mockImplementation(({ where }) => Promise.resolve({ id: where.id })),
      findMany: jest.fn().mockResolvedValue([]),
    },
  },
}))

jest.mock('@/lib/tmdb', () => ({
  getPersonDetail: jest.fn().mockReturnValue('valid-person-details-url'),
  getPersonSocialMedia: jest.fn().mockReturnValue('valid-social-media-url'),
  getPersonMovieCredits: jest.fn().mockReturnValue('valid-movie-credits-url'),
  getPersonTvCredits: jest.fn().mockReturnValue('valid-tv-credits-url'),
}))

beforeAll(() => {
  global.fetch = jest.fn((url) => {
    const mockData = {
      'valid-person-details-url': {
        id: 123,
        name: 'Person 1',
        biography: 'Person Biography',
        profile_path: '/mock.jpg',
        birthday: '2023-01-01',
        popularity: 1000,
      },
      'valid-social-media-url': {
        facebook_id: 'facebookusername',
        twitter_id: 'twitterusername',
        instagram_id: 'instagramusername',
      },
      'valid-movie-credits-url': {
        results: [{ id: 2, title: 'Movie 1' }],
      },
      'valid-tv-credits-url': {
        results: [{ id: 3, title: 'Series 1' }],
      },
    }[url as string]

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData || {}),
    })
  }) as jest.Mock
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('GET /api/person/[id]', () => {
  it('should return basic person data with status 200', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '123' },
    })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())

    expect(data.detail.name).toBe('Person 1')
    expect(data.detail.birthday).toBe('2023-01-01')
    expect(data.detail.popularity).toBe(1000)
  })

  it('should include movie credits', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '123' },
    })

    await handler(req as any, res as any)

    const data = JSON.parse(res._getData())
    expect(data.movieCredits.results).toHaveLength(1)
    expect(data.movieCredits.results[0].title).toBe('Movie 1')
  })

  it('should include tv credits', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '123' },
    })

    await handler(req as any, res as any)

    const data = JSON.parse(res._getData())
    expect(data.tvCredits.results).toHaveLength(1)
    expect(data.tvCredits.results[0].title).toBe('Series 1')
  })

  it('should include social media', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '123' },
    })

    await handler(req as any, res as any)

    const data = JSON.parse(res._getData())
    expect(data.social.facebook_id).toBe('facebookusername')
    expect(data.social.twitter_id).toBe('twitterusername')
    expect(data.social.instagram_id).toBe('instagramusername')
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
