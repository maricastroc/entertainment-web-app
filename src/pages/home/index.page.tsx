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

import { Container, MainContent, ScrollableContainer, Wrapper } from './styles'

import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { pathToSearchAll } from '@/utils'
import MediaList from './components/MediaList'
import TrendingMediaCollection from './components/TrendingMediaCollection'
import { NextSeo } from 'next-seo'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { LoadingComponent } from '@/components/LoadingComponent'
import { useEffect, useState } from 'react'

export interface MediaCardProps {
  id?: string
  name?: string
  title?: string
  first_air_date?: string
  release_date?: string
  media_type?: string
  backdrop_path?: string
  poster_path?: string
  handleClick: () => void
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
  const isRouteLoading = useLoadingOnRouteChange()

  const [isClient, setIsClient] = useState(false)

  const trendingMoviesList = trendingMovies.results
    .filter((item) => item.backdrop_path !== null)
    .slice(0, 5)

  const popularMoviesList = popularMovies.results
    .filter((item) => item.backdrop_path !== null)
    .slice(0, 6)

  const nowPlayingMoviesList = nowPlayingMovies.results
    .filter((item) => item.backdrop_path !== null)
    .slice(0, 6)

  const upcomingMoviesList = upcomingMovies.results
    .filter((item) => item.backdrop_path !== null)
    .slice(0, 6)

  const topRatedMoviesList = topRatedMovies.results
    .filter((item) => item.backdrop_path !== null)
    .slice(0, 6)

  const trendingSeriesList = trendingSeries.results
    .filter((item) => item.backdrop_path !== null)
    .slice(0, 5)

  const popularSeriesList = popularSeries.results
    .filter((item) => item.backdrop_path !== null)
    .slice(0, 6)

  const airingTodaySeriesList = airingTodaySeries.results
    .filter((item) => item.backdrop_path !== null)
    .slice(0, 6)

  const onAirSeriesList = onTheAirSeries.results
    .filter((item) => item.backdrop_path !== null)
    .slice(0, 6)

  const topRatedSeriesList = topRatedSeries.results
    .filter((item) => item.backdrop_path !== null)
    .slice(0, 6)

  const mediaTrendingMoviesLists = [
    { title: 'Trending', items: trendingMoviesList, media: 'Movie' },
  ]

  const mediaTrendingSeriesLists = [
    { title: 'Trending', items: trendingSeriesList, media: 'TV Series' },
  ]

  const mediaMoviesLists = [
    {
      title: 'Popular',
      items: popularMoviesList,
      media: 'Movie',
      endpoint: 'popular',
    },
    {
      title: 'Now Playing',
      items: nowPlayingMoviesList,
      media: 'Movie',
      endpoint: 'nowplaying',
    },
    {
      title: 'Upcoming',
      items: upcomingMoviesList,
      media: 'Movie',
      endpoint: 'upcoming',
    },
    {
      title: 'Top Rated',
      items: topRatedMoviesList,
      media: 'Movie',
      endpoint: 'top',
    },
  ]

  const mediaSeriesLists = [
    {
      title: 'Popular',
      items: popularSeriesList,
      media: 'TV Series',
      endpoint: 'popular',
    },
    {
      title: 'Airing Today',
      items: airingTodaySeriesList,
      media: 'TV Series',
      endpoint: 'airing',
    },
    {
      title: 'On Air',
      items: onAirSeriesList,
      media: 'TV Series',
      endpoint: 'onair',
    },
    {
      title: 'Top Rated',
      items: topRatedSeriesList,
      media: 'TV Series',
      endpoint: 'top',
    },
  ]

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <NextSeo title="Home | MovieMentor" />
      {isClient && (
        <Wrapper>
          <Header />
          <Container>
            <SearchBar
              searchPath={pathToSearchAll}
              placeholder="Search for movie / TV series"
            />
            <MainContent>
              {mediaTrendingMoviesLists.map(({ title, items }) => (
                <TrendingMediaCollection
                  key={title}
                  title={title}
                  items={items}
                  media_type="movie"
                />
              ))}
              {mediaMoviesLists.map(({ title, items, media, endpoint }) => (
                <MediaList
                  key={title}
                  title={title}
                  items={items}
                  media={media}
                  endpoint={endpoint}
                />
              ))}
              <ScrollableContainer>
                {mediaTrendingSeriesLists.map(({ title, items }) => (
                  <TrendingMediaCollection
                    withTopMargin
                    key={title}
                    title={title}
                    items={items}
                    media_type="TV series"
                  />
                ))}
              </ScrollableContainer>
              {mediaSeriesLists.map(({ title, items, media, endpoint }) => (
                <MediaList
                  key={title}
                  title={title}
                  items={items}
                  media={media}
                  endpoint={endpoint}
                />
              ))}
            </MainContent>
          </Container>
          {isRouteLoading && <LoadingComponent hasOverlay />}
        </Wrapper>
      )}
    </>
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
