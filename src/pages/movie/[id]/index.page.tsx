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
  MovieContainer,
  MovieContent,
  MovieImage,
  RatingContainer,
  Separator,
  SynopsisContainer,
  Wrapper,
} from './styles'

import Loading from '@/components/Loading'
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { StarsRating } from '@/components/StarsRating'

import { Icon } from '@iconify/react/dist/iconify.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import { convertLanguageCodeToName } from '@/utils/convertLanguageCodeToName'
import { pathToSearchMovie } from '@/utils'
import { NextSeo } from 'next-seo'

interface SpokenLanguagesProps {
  name: string
}

interface GenresProps {
  id: number
  name: string
}

interface DetailProps {
  original_title: string
  overview: string
  tagline: string
  poster_path: string
  vote_average: number
  runtime: number
  release_date: string
  spoken_languages: SpokenLanguagesProps[]
  status: string
  genres: GenresProps[]
  homepage: string
  imdb_id: string
  original_language: string
}

interface MovieDataProps {
  detail: DetailProps
}

export default function Movie() {
  const router = useRouter()
  const { id } = router.query

  const [movieData, setMovieData] = useState<MovieDataProps | undefined>()

  useEffect(() => {
    fetch(`/api/movie/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data)
      })
      .catch((error) => {
        console.error('Error getting movie details:', error)
      })
  }, [id])

  function convertRatingTo5Scale(ratingOutOf10: number) {
    return ratingOutOf10 * (5 / 10)
  }

  return (
    <>
      <NextSeo title="Movie | MovieMentor" />
      {movieData?.detail ? (
        <Wrapper>
          <Header />
          <Container>
            <SearchBar
              searchPath={pathToSearchMovie}
              placeholder="Search for movie"
            />
            <MovieContainer>
              <MovieImage
                src={`https://image.tmdb.org/t/p/original${movieData?.detail?.poster_path}`}
              />
              <MovieContent>
                <Heading>
                  <h2>{movieData?.detail?.original_title}</h2>
                  <p>{movieData?.detail?.tagline}</p>
                </Heading>
                <Separator />
                <RatingContainer>
                  <h2>
                    {convertRatingTo5Scale(
                      movieData?.detail?.vote_average,
                    ).toFixed(2)}
                  </h2>
                  <StarsRating
                    rating={convertRatingTo5Scale(
                      movieData?.detail?.vote_average,
                    )}
                  />
                </RatingContainer>
                <Separator />
                <GeneralInfoContainer>
                  <GeneralInfoItem>
                    <h2>Length</h2>
                    <p>{`${movieData?.detail?.runtime}min.`}</p>
                  </GeneralInfoItem>
                  <GeneralInfoItem>
                    <h2>Language</h2>
                    <p>
                      {convertLanguageCodeToName(
                        movieData?.detail?.original_language,
                      ) || '-'}
                    </p>
                  </GeneralInfoItem>
                  <GeneralInfoItem>
                    <h2>Year</h2>
                    <p>{movieData?.detail?.release_date?.split('-')[0]}</p>
                  </GeneralInfoItem>
                  <GeneralInfoItem>
                    <h2>Status</h2>
                    <p>{movieData?.detail?.status}</p>
                  </GeneralInfoItem>
                </GeneralInfoContainer>
                <Separator />
                <GenresContainer>
                  <h2>Genres</h2>
                  <GenresContent>
                    {movieData?.detail.genres.length > 0 ? (
                      movieData?.detail?.genres?.map((genre) => {
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
                  <p>{movieData?.detail?.overview || 'N/A'}</p>
                </SynopsisContainer>
                <Separator />
                <LinksContainer>
                  <LinkItem href={movieData?.detail?.homepage} target="_blank">
                    <span>Website</span>
                    <FontAwesomeIcon icon={faLink} />
                  </LinkItem>
                  <LinkItem
                    href={`https://www.imdb.com/title/${movieData?.detail?.imdb_id}`}
                    target="_blank"
                  >
                    <span>IMDB</span>
                    <Icon icon="bxl:imdb" color="white" />
                  </LinkItem>
                </LinksContainer>
              </MovieContent>
            </MovieContainer>
          </Container>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  )
}
