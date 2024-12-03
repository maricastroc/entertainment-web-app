import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import {
  Container,
  GeneralInfoContainer,
  GeneralInfoItem,
  GenreItem,
  GenresContainer,
  GenresContent,
  Heading,
  LinkItem,
  LinksContainer,
  SeriesContainer,
  SeriesContent,
  SeriesImage,
  RatingContainer,
  Separator,
  SynopsisContainer,
  Wrapper,
} from './styles'

import Loading from '@/components/Loading'
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { StarsRating } from '@/components/StarsRating'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import { convertLanguageCodeToName } from '@/utils/convertLanguageCodeToName'
import { pathToSearchTV } from '@/utils'
import { NextSeo } from 'next-seo'

interface SpokenLanguagesProps {
  name: string
}

interface GenresProps {
  id: number
  name: string
}

interface DetailProps {
  name: string
  overview: string
  tagline: string
  poster_path: string
  vote_average: number
  number_of_episodes: number
  last_air_date: string
  spoken_languages: SpokenLanguagesProps[]
  status: string
  genres: GenresProps[]
  homepage: string
  original_language: string
}

interface SeriesDataProps {
  detail: DetailProps
}

export default function Series() {
  const router = useRouter()

  const { id } = router.query

  const [seriesData, setSeriesData] = useState<SeriesDataProps | undefined>()

  useEffect(() => {
    if (id) {
      fetch(`/api/tv/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSeriesData(data)
        })
        .catch((error) => {
          console.error('Error getting movie details:', error)
        })
    }
  }, [id])

  function convertRatingTo5Scale(ratingOutOf10: number) {
    return ratingOutOf10 * (5 / 10)
  }

  return (
    <>
      <NextSeo title="TV Series | MovieMentor" />
      {seriesData?.detail ? (
        <Wrapper>
          <Header />
          <Container>
            <SearchBar
              searchPath={pathToSearchTV}
              placeholder="Search for TV Series"
            />
            <SeriesContainer>
              <SeriesImage
                src={`https://image.tmdb.org/t/p/original${seriesData?.detail?.poster_path}`}
              />
              <SeriesContent>
                <Heading>
                  <h2>{seriesData?.detail?.name}</h2>
                  <p>{seriesData?.detail?.tagline}</p>
                </Heading>
                <Separator />
                <RatingContainer>
                  <h2>
                    {convertRatingTo5Scale(
                      seriesData?.detail?.vote_average,
                    ).toFixed(2)}
                  </h2>
                  <StarsRating
                    rating={convertRatingTo5Scale(
                      seriesData?.detail?.vote_average,
                    )}
                  />
                </RatingContainer>
                <Separator />
                <GeneralInfoContainer>
                  <GeneralInfoItem>
                    <h2>Episodes</h2>
                    <p>{`${seriesData?.detail?.number_of_episodes} episodes`}</p>
                  </GeneralInfoItem>
                  <GeneralInfoItem>
                    <h2>Language</h2>
                    <p>
                      {convertLanguageCodeToName(
                        seriesData?.detail?.original_language,
                      ) || '-'}
                    </p>
                  </GeneralInfoItem>
                  <GeneralInfoItem>
                    <h2>Year</h2>
                    <p>{seriesData?.detail?.last_air_date?.split('-')[0]}</p>
                  </GeneralInfoItem>
                  <GeneralInfoItem>
                    <h2>Status</h2>
                    <p>{seriesData?.detail?.status}</p>
                  </GeneralInfoItem>
                </GeneralInfoContainer>
                <Separator />
                <GenresContainer>
                  <h2>Genres</h2>
                  <GenresContent>
                    {seriesData?.detail.genres.length > 0 ? (
                      seriesData?.detail?.genres?.map((genre) => {
                        return (
                          <GenreItem key={genre.id}>{genre.name}</GenreItem>
                        )
                      })
                    ) : (
                      <p>N/A</p>
                    )}
                  </GenresContent>
                </GenresContainer>
                <Separator />
                <SynopsisContainer>
                  <h2>Synopsis</h2>
                  <p>{seriesData?.detail?.overview || 'N/A'}</p>
                </SynopsisContainer>
                <Separator />
                {seriesData?.detail?.homepage !== '' && (
                  <LinksContainer>
                    <LinkItem
                      href={seriesData?.detail?.homepage}
                      target="_blank"
                    >
                      <span>Website</span>
                      <FontAwesomeIcon icon={faLink} />
                    </LinkItem>
                  </LinksContainer>
                )}
              </SeriesContent>
            </SeriesContainer>
          </Container>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  )
}
