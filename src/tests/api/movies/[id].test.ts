/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import handler from '@/pages/api/movie/[id].api'
import { createMocks } from 'node-mocks-http'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    movie: {
      upsert: jest
        .fn()
        .mockImplementation(({ where }) => Promise.resolve({ id: where.id })),
      findMany: jest.fn().mockResolvedValue([]),
    },
    externalReview: {
      upsert: jest.fn().mockImplementation(({ where, create }) => {
        return Promise.resolve({
          ...create,
          id: where.id,
          movieId: '123',
        })
      }),
      findMany: jest.fn().mockImplementation(() => {
        return Promise.resolve([
          {
            id: 'review1',
            author: 'Critic 1',
            content: 'Great movie!',
            createdAt: new Date('2023-01-01'),
            rating: 8,
            username: 'critic1',
            name: 'Critic 1',
            avatarPath: null,
            movieId: '123',
          },
        ])
      }),
    },
    rating: {
      findMany: jest.fn().mockResolvedValue([]),
    },
    vote: {
      findMany: jest.fn().mockResolvedValue([]),
    },
  },
}))

jest.mock('@/lib/tmdb', () => ({
  getMovieDetail: jest.fn().mockReturnValue('valid-movie-url'),
  getMovieCasts: jest.fn().mockReturnValue('valid-casts-url'),
  getMovieReviews: jest.fn().mockReturnValue('valid-reviews-url'),
  getMovieSimilars: jest.fn().mockReturnValue('valid-similars-url'),
  getMovieVideos: jest.fn().mockReturnValue('valid-videos-url'),
}))

beforeAll(() => {
  global.fetch = jest.fn((url) => {
    const mockData = {
      'valid-movie-url': {
        id: 123,
        title: 'Mock Movie',
        vote_count: 100,
        vote_average: 8.5,
        overview: 'Mock overview',
        poster_path: '/mock.jpg',
        release_date: '2023-01-01',
      },
      'valid-casts-url': {
        cast: [{ id: 1, name: 'Actor 1' }],
        crew: [{ id: 2, name: 'Director 1' }],
      },
      'valid-reviews-url': {
        results: [
          {
            id: 'review1',
            author: 'Critic 1',
            content: 'Great movie!',
            created_at: '2023-01-01T00:00:00Z',
            author_details: {
              rating: 8,
              username: 'critic1',
            },
          },
        ],
      },
      'valid-similars-url': {
        results: [{ id: 2, title: 'Similar Movie' }],
      },
      'valid-videos-url': {
        results: [{ key: 'video1', name: 'Trailer' }],
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

describe('GET /api/movies/[id]', () => {
  it('should return basic movie data with status 200', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '123' },
    })

    await handler(req as any, res as any)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.data.detail.title).toBe('Mock Movie')
    expect(data.data.detail.overview).toBe('Mock overview')
  })

  it('should include cast and crew', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '123' },
    })

    await handler(req as any, res as any)

    const data = JSON.parse(res._getData())
    expect(data.data.credits.cast).toHaveLength(1)
    expect(data.data.credits.cast[0].name).toBe('Actor 1')
    expect(data.data.credits.crew).toHaveLength(1)
  })

  it('should include similar media', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '123' },
    })

    await handler(req as any, res as any)

    const data = JSON.parse(res._getData())
    expect(data.data.similars.results).toHaveLength(1)
    expect(data.data.similars.results[0].title).toBe('Similar Movie')
  })

  it('should properly process reviews', async () => {
    require('@/lib/prisma').prisma.rating.findMany.mockResolvedValueOnce([
      {
        id: 'local1',
        rate: 9,
        description: 'Excellent',
        createdAt: new Date('2023-01-02'),
        user: { id: 'user1', name: 'User 1', avatarUrl: '/avatar.jpg' },
      },
    ])

    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '123' },
    })

    await handler(req as any, res as any)

    const data = JSON.parse(res._getData())
    expect(data.data.reviews.results).toHaveLength(2)
    expect(data.data.reviews.results[1].author).toBe('Critic 1')
    expect(data.data.reviews.results[0].author).toBe('User 1')
  })

  it('should combine local and TMDB ratings', async () => {
    require('@/lib/prisma').prisma.rating.findMany.mockResolvedValueOnce([
      {
        id: 'local1',
        rate: 9,
        description: 'Excellent',
        createdAt: new Date('2023-01-02'),
        user: { id: 'user1', name: 'User 1', avatarUrl: '/avatar.jpg' },
        movieId: '123',
      },
    ])

    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '123' },
    })

    await handler(req as any, res as any)

    const data = JSON.parse(res._getData())
    expect(data.data.detail.vote_count).toBe(101)
    expect(data.data.detail.vote_average).toBeCloseTo(8.5)
  })
})
