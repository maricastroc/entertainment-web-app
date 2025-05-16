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

import { MainContent } from './styles'
import { pathToSearchAll } from '@/utils'
import MediaList from './partials/MediaList'
import TrendingMediaCollection from './partials/TrendingMediaCollection'
import { NextSeo } from 'next-seo'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { SignUpModal } from '@/components/Shared/SignUpModal'
import * as Dialog from '@radix-ui/react-dialog'
import { MOVIE_MEDIA, TV_MEDIA } from '@/utils/constants'
import AuthLayout from '@/layouts/auth'

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

  const { isLoading, isSignUpModalOpen } = useAppContext()

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
      media: MOVIE_MEDIA,
      endpoint: 'popular',
    },
    {
      title: 'Now Playing',
      items: nowPlayingMoviesList,
      media: MOVIE_MEDIA,
      endpoint: 'nowplaying',
    },
    {
      title: 'Upcoming',
      items: upcomingMoviesList,
      media: MOVIE_MEDIA,
      endpoint: 'upcoming',
    },
    {
      title: 'Top Rated',
      items: topRatedMoviesList,
      media: MOVIE_MEDIA,
      endpoint: 'top',
    },
  ]

  const mediaSeriesLists = [
    {
      title: 'Popular',
      items: popularSeriesList,
      media: TV_MEDIA,
      endpoint: 'popular',
    },
    {
      title: 'Airing Today',
      items: airingTodaySeriesList,
      media: TV_MEDIA,
      endpoint: 'airing',
    },
    {
      title: 'On Air',
      items: onAirSeriesList,
      media: TV_MEDIA,
      endpoint: 'onair',
    },
    {
      title: 'Top Rated',
      items: topRatedSeriesList,
      media: TV_MEDIA,
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
        <AuthLayout
          searchPath={pathToSearchAll}
          searchPlaceholder="Search for Movies / TV series / People"
          isLoading={isRouteLoading || isLoading}
        >
          <Dialog.Root open={isSignUpModalOpen}>
            <SignUpModal />
          </Dialog.Root>
          <MainContent>
            {mediaTrendingMoviesLists.map(({ title, items }) => (
              <TrendingMediaCollection
                key={title}
                title={title}
                items={items}
                media_type={MOVIE_MEDIA}
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
            {mediaTrendingSeriesLists.map(({ title, items }) => (
              <TrendingMediaCollection
                withTopMargin
                key={title}
                title={title}
                items={items}
                media_type={TV_MEDIA}
              />
            ))}
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
        </AuthLayout>
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
