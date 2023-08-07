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

import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { pathToSearchAll } from '@/utils'
import MediaList from './components/MediaList'
import TrendingMediaCollection from './components/TrendingMediaCollection'

export interface MediaCardProps {
  id?: string
  name?: string
  title?: string
  first_air_date?: string
  release_date?: string
  media_type?: string
  backdrop_path?: string
  poster_path?: string
}

interface HomeProps {
  trendingMovies: {
    results: MediaCardProps[]
  }
  popularMovies: {
    results: MediaCardProps[]
  }
  nowPlayingMovies: {
    results: MediaCardProps[]
  }
  upcomingMovies: {
    results: MediaCardProps[]
  }
  topRatedMovies: {
    results: MediaCardProps[]
  }
  trendingSeries: {
    results: MediaCardProps[]
  }
  popularSeries: {
    results: MediaCardProps[]
  }
  airingTodaySeries: {
    results: MediaCardProps[]
  }
  onTheAirSeries: {
    results: MediaCardProps[]
  }
  topRatedSeries: {
    results: MediaCardProps[]
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
        <SearchBar
          searchPath={pathToSearchAll}
          placeholder="Search for movie / TV series"
        />
        <ScrollableContainer>
          {mediaTrendingMoviesLists.map(({ title, items }) => (
            <TrendingMediaCollection
              key={title}
              title={title}
              items={items}
              media_type="movie"
            />
          ))}
        </ScrollableContainer>
        {mediaMoviesLists.map(({ title, items, media }) => (
          <MediaList key={title} title={title} items={items} media={media} />
        ))}
        <ScrollableContainer>
          {mediaTrendingSeriesLists.map(({ title, items }) => (
            <TrendingMediaCollection
              key={title}
              title={title}
              items={items}
              media_type="TV series"
            />
          ))}
        </ScrollableContainer>
        {mediaSeriesLists.map(({ title, items, media }) => (
          <MediaList key={title} title={title} items={items} media={media} />
        ))}
      </Container>
    </Wrapper>
  )
}

async function fetchData(endpoint: string) {
  const page = '1'

  const url = getUrl2(endpoint, page)
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
