import dotenv from 'dotenv'
dotenv.config()

const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_ENDPOINT = process.env.TMDB_ENDPOINT

interface ApiParams {
  endpoint: string
  id?: string
  genre?: string
  query?: string
  page?: string
}

export function getUrl<T extends ApiParams>(params: T): string {
  const { endpoint, id, genre, page } = params
  return `https://api.themoviedb.org/3/${endpoint}?api_key=d7996d8db8d78ad9875ded8c14a23692&with_genres=${id}&name=${genre}&page=${page}`
}

export function getUrl2<T extends ApiParams>(params: T): string {
  dotenv.config()
  const TMDB_API_KEY = process.env.TMDB_API_KEY
  const TMDB_ENDPOINT = process.env.TMDB_ENDPOINT

  const { endpoint, page } = params
  return `${TMDB_ENDPOINT}/${endpoint}?api_key=${TMDB_API_KEY}&page=${page}`
}

export function getGenre<T extends ApiParams>(params: T): string {
  const { endpoint } = params
  return `${TMDB_ENDPOINT}/${endpoint}?api_key=${TMDB_API_KEY}`
}

export function getMovieDetail(id: string) {
  return `${TMDB_ENDPOINT}/movie/${id}?api_key=${TMDB_API_KEY}`
}

export function getMovieCasts(id: string) {
  return `${TMDB_ENDPOINT}/movie/${id}/credits?api_key=${TMDB_API_KEY}`
}

export function getTvDetail<T extends ApiParams>(params: T): string {
  const { id } = params
  return `${TMDB_ENDPOINT}/tv/${id}?api_key=${TMDB_API_KEY}`
}

export function getTvCasts<T extends ApiParams>(params: T): string {
  const { id } = params
  return `${TMDB_ENDPOINT}/tv/${id}/credits?api_key=${TMDB_API_KEY}`
}

// Search for movies and tv series
export function search(query: string, page: string) {
  return `${TMDB_ENDPOINT}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    query,
  )}&page=${page}`
}

// Search for movies only
export function searchMovie(query: string, page: string) {
  return `${TMDB_ENDPOINT}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    query,
  )}&page=${page}`
}

// Search for tv series only
export function searchTv(query: string, page: string) {
  return `${TMDB_ENDPOINT}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    query,
  )}&page=${page}`
}

// Endpoints

// Trending
export const trendingAllDay = 'trending/all/day'
export const trendingAllWeek = 'trending/all/week'
export const trendingMovieDay = 'trending/movie/day'
export const trendingMovieWeek = 'trending/movie/week'
export const trendingTvDay = 'trending/tv/day'
export const trendingTvWeek = 'trending/tv/week'

// Movie
export const moviePopular = 'movie/popular'
export const movieNowPlaying = 'movie/now_playing'
export const movieUpcoming = 'movie/upcoming'
export const movieTopRated = 'movie/top_rated'
export const movieLatest = 'movie/latest'

// TV
export const tvPopular = 'tv/popular'
export const tvAiringToday = 'tv/airing_today'
export const tvOnTheAir = 'tv/on_the_air'
export const tvTopRated = 'tv/top_rated'

// Genre
export const genreMovie = '/genre/movie/list'
export const genreTV = '/genre/tv/list'

// Discover
export const discoverMovie = 'discover/movie'
export const discoverTV = 'discover/tv'
