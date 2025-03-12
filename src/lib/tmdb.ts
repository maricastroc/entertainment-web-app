import dotenv from 'dotenv'
dotenv.config()

const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_ENDPOINT = process.env.TMDB_ENDPOINT

export function getUrl(
  endpoint: string,
  id: string,
  genre: string,
  page: string,
) {
  return `https://api.themoviedb.org/3/${endpoint}?api_key=d7996d8db8d78ad9875ded8c14a23692&with_genres=${id}&name=${genre}&page=${page}`
}

export function getUrl2(endpoint: string, page: string) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY
  const TMDB_ENDPOINT = process.env.TMDB_ENDPOINT

  return `${TMDB_ENDPOINT}/${endpoint}?api_key=${TMDB_API_KEY}&page=${page}`
}

export function getGenre(endpoint: string) {
  return `${TMDB_ENDPOINT}/${endpoint}?api_key=${TMDB_API_KEY}`
}

export function getMovieDetail(id: string) {
  return `${TMDB_ENDPOINT}/movie/${id}?api_key=${TMDB_API_KEY}`
}

export function getMovieSimilars(id: string) {
  return `${TMDB_ENDPOINT}/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`
}

export function getMovieMedia(id: string) {
  return `${TMDB_ENDPOINT}/movie/${id}/watch/providers?api_key=${TMDB_API_KEY}`
}

export function getMovieCredits(id: string) {
  return `${TMDB_ENDPOINT}/movie/${id}/credits?api_key=${TMDB_API_KEY}`
}

export function getMovieVideos(id: string) {
  return `${TMDB_ENDPOINT}/movie/${id}/videos?api_key=${TMDB_API_KEY}`
}

export function getMovieReviews(id: string, page = '1') {
  return `${TMDB_ENDPOINT}/movie/${id}/reviews?api_key=${TMDB_API_KEY}&page=${page}`
}

export function getMovieCasts(id: string) {
  return `${TMDB_ENDPOINT}/movie/${id}/credits?api_key=${TMDB_API_KEY}`
}

export function getTvDetail(id: string) {
  return `${TMDB_ENDPOINT}/tv/${id}?api_key=${TMDB_API_KEY}`
}

export function getTvCasts(id: string) {
  return `${TMDB_ENDPOINT}/tv/${id}/credits?api_key=${TMDB_API_KEY}`
}

export function getTvSimilars(id: string) {
  return `${TMDB_ENDPOINT}/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`
}

export function getTvCredits(id: string) {
  return `${TMDB_ENDPOINT}/tv/${id}/credits?api_key=${TMDB_API_KEY}`
}

export function getTvMedia(id: string) {
  return `${TMDB_ENDPOINT}/tv/${id}/watch/providers?api_key=${TMDB_API_KEY}`
}

export function getTvReviews(id: string, page = '1') {
  return `${TMDB_ENDPOINT}/tv/${id}/reviews?api_key=${TMDB_API_KEY}&page=${page}`
}

export function getTvVideos(id: string) {
  return `${TMDB_ENDPOINT}/tv/${id}/videos?api_key=${TMDB_API_KEY}`
}

export function search(query: string, page: string) {
  return `${TMDB_ENDPOINT}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    query,
  )}&page=${page}`
}

export function searchMovie(query: string, page: string) {
  return `${TMDB_ENDPOINT}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    query,
  )}&page=${page}`
}

export function searchTv(query: string, page: string) {
  return `${TMDB_ENDPOINT}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    query,
  )}&page=${page}`
}

export function getPersonDetail(id: string) {
  return `${TMDB_ENDPOINT}/person/${id}?api_key=${TMDB_API_KEY}`
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
export const genreMovie = 'genre/movie/list'
export const genreTV = 'genre/tv/list'

// Discover
export const discoverMovie = 'discover/movie'
export const discoverTV = 'discover/tv'
