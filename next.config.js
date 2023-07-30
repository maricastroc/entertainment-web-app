const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  env: {
    TMDB_ENDPOINT: process.env.TMDB_ENDPOINT,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
}

module.exports = nextConfig
