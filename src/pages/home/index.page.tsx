import {
  trendingMovieDay,
  getUrl2,
  trendingTvDay,
  moviePopular,
  tvPopular,
  tvAiringToday,
  tvOnTheAir,
  tvTopRated,
  movieNowPlaying,
  movieUpcoming,
  movieTopRated,
} from '../../lib/tmdb'

import { Container, ScrollableContainer, Wrapper } from './styles'

import MovieList from './components/MovieList'
import SeriesList from './components/SeriesList'
import TrendingMoviesCollection from './components/TrendingMoviesCollection'
import TrendingSeriesCollection from './components/TrendingSeriesCollection'
import { TrendingMovieCardProps } from '@/components/TrendingMovieCard'
import { MovieCardProps } from '@/components/MovieCard'
import { TrendingSeriesCardProps } from '@/components/TrendingSeriesCard'
import { SeriesCardProps } from '@/components/SeriesCard'
import { Header } from '@/components/Header'

interface HomeProps {
  trendingMovies: {
    results: TrendingMovieCardProps[]
  }
  popularMovies: {
    results: MovieCardProps[]
  }
  nowPlayingMovies: {
    results: MovieCardProps[]
  }
  upcomingMovies: {
    results: MovieCardProps[]
  }
  topRatedMovies: {
    results: MovieCardProps[]
  }
  trendingSeries: {
    results: TrendingSeriesCardProps[]
  }
  popularSeries: {
    results: SeriesCardProps[]
  }
  airingTodaySeries: {
    results: SeriesCardProps[]
  }
  onTheAirSeries: {
    results: SeriesCardProps[]
  }
  topRatedSeries: {
    results: SeriesCardProps[]
  }
}

export default function Home({
  trendingMovies,
  popularMovies,
  nowPlayingMovies,
  upcomingMovies,
  topRatedMovies,
  trendingSeries,
  popularSeries,
  airingTodaySeries,
  onTheAirSeries,
  topRatedSeries,
}: HomeProps) {
  const trendingMoviesList = trendingMovies.results.slice(0, 5)

  const popularMoviesList = popularMovies.results.slice(0, 6)

  const nowPlayingMoviesList = nowPlayingMovies.results.slice(0, 6)

  const upcomingMoviesList = upcomingMovies.results.slice(0, 6)

  const topRatedMoviesList = topRatedMovies.results.slice(0, 6)

  const trendingSeriesList = trendingSeries.results.slice(0, 5)

  const popularSeriesList = popularSeries.results.slice(0, 6)

  const airingTodaySeriesList = airingTodaySeries.results.slice(0, 6)

  const onAirSeriesList = onTheAirSeries.results.slice(0, 6)

  const topRatedSeriesList = topRatedSeries.results.slice(0, 6)

  const mediaTrendingMoviesLists = [
    { title: 'Trending', items: trendingMoviesList, media: 'Movie' },
  ]

  const mediaTrendingSeriesLists = [
    { title: 'Trending', items: trendingSeriesList, media: 'TV Series' },
  ]

  const mediaMoviesLists = [
    { title: 'Popular', items: popularMoviesList, media: 'Movie' },
    { title: 'Now Playing', items: nowPlayingMoviesList, media: 'Movie' },
    { title: 'Upcoming', items: upcomingMoviesList, media: 'Movie' },
    { title: 'Top Rated', items: topRatedMoviesList, media: 'Movie' },
  ]

  const mediaSeriesLists = [
    { title: 'Popular', items: popularSeriesList, media: 'TV Series' },
    { title: 'Airing Today', items: airingTodaySeriesList, media: 'TV Series' },
    { title: 'On Air', items: onAirSeriesList, media: 'TV Series' },
    { title: 'Top Rated', items: topRatedSeriesList, media: 'TV Series' },
  ]

  return (
    <Wrapper>
      <Header />
      <Container>
        <ScrollableContainer>
          {mediaTrendingMoviesLists.map(({ title, items }) => (
            <TrendingMoviesCollection key={title} title={title} items={items} />
          ))}
        </ScrollableContainer>
        {mediaMoviesLists.map(({ title, items, media }) => (
          <MovieList key={title} title={title} items={items} media={media} />
        ))}
        <ScrollableContainer>
          {mediaTrendingSeriesLists.map(({ title, items }) => (
            <TrendingSeriesCollection key={title} title={title} items={items} />
          ))}
        </ScrollableContainer>
        {mediaSeriesLists.map(({ title, items, media }) => (
          <SeriesList key={title} title={title} items={items} media={media} />
        ))}
      </Container>
    </Wrapper>
  )
}

async function fetchData(endpoint: string) {
  const params = {
    endpoint,
    page: '1',
  }

  const url = getUrl2(params)
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export async function getServerSideProps() {
  const trendingMovies = await fetchData(trendingMovieDay)
  const popularMovies = await fetchData(moviePopular)
  const nowPlayingMovies = await fetchData(movieNowPlaying)
  const upcomingMovies = await fetchData(movieUpcoming)
  const topRatedMovies = await fetchData(movieTopRated)

  const trendingSeries = await fetchData(trendingTvDay)
  const popularSeries = await fetchData(tvPopular)
  const airingTodaySeries = await fetchData(tvAiringToday)
  const onTheAirSeries = await fetchData(tvOnTheAir)
  const topRatedSeries = await fetchData(tvTopRated)

  return {
    props: {
      trendingMovies,
      popularMovies,
      nowPlayingMovies,
      upcomingMovies,
      topRatedMovies,
      trendingSeries,
      popularSeries,
      airingTodaySeries,
      onTheAirSeries,
      topRatedSeries,
    },
  }
}
