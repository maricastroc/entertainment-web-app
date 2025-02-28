import { useEffect, useState } from 'react'

import {
  CloseButton,
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
  MovieDetails,
  MovieDetailsWrapper,
  MovieImage,
  MovieInfo,
  RatingContainer,
  Separator,
  SimilarContainer,
  SimilarContent,
  SynopsisContainer,
  VisibleSeparator,
  Wrapper,
  LateralMenuWrapper,
  OverlayBackground,
} from './styles'

import Loading from '@/components/Loading'
import { StarsRating } from '@/components/StarsRating'

import { Icon } from '@iconify/react/dist/iconify.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import { convertLanguageCodeToName } from '@/utils/convertLanguageCodeToName'
import {
  getMovieSimilars,
  getMovieReviews,
  getTvSimilars,
  getTvReviews,
} from '@/lib/tmdb'
import { ReviewProps } from '@/types/review'
import { SimilarCard, SimilarCardProps } from '@/components/SimilarCard'
import { X } from 'phosphor-react'
import { ReviewSection } from '../ReviewSection'

interface Props {
  id: string
  media_type: string
  onClose: () => void
}

interface SpokenLanguagesProps {
  name: string
}

export interface GenresProps {
  id: number
  name: string
}

interface DetailProps {
  original_title: string
  overview: string
  name: string
  tagline: string
  poster_path: string
  vote_average: number
  number_of_episodes?: number
  runtime: number
  release_date: string
  last_air_date?: string
  spoken_languages: SpokenLanguagesProps[]
  status: string
  genres: GenresProps[]
  homepage: string
  imdb_id: string
  original_language: string
}

interface mediaDataProps {
  detail: DetailProps
}

interface ReviewDataProps {
  id: string
  page: number
  results: ReviewProps[]
  total_pages: number
  total_results: number
}

export default function MediaModal({ id, onClose, media_type }: Props) {
  const [mediaData, setMediaData] = useState<mediaDataProps | undefined>()

  const [updatedId, setUpdatedId] = useState(id)

  const [similarMedias, setSimilarMedias] = useState<SimilarCardProps[] | []>()

  const [reviewData, setReviewData] = useState<ReviewDataProps | null>(null)

  const media = media_type === 'movie' ? 'movie' : 'tv'

  useEffect(() => {
    if (!updatedId) return

    fetch(`/api/${media}/${updatedId}`)
      .then((response) => response.json())
      .then((data) => {
        setMediaData(data)
      })
      .catch((error) => {
        console.error('Error getting details:', error)
      })
  }, [updatedId, media])

  useEffect(() => {
    if (!updatedId) return

    async function fetchReviews() {
      try {
        const response = await fetch(
          media === 'movie'
            ? getMovieReviews(updatedId as string)
            : getTvReviews(updatedId as string),
        )

        if (!response.ok) {
          throw new Error('Error getting movie reviews')
        }

        const data = await response.json()

        setReviewData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchReviews()
  }, [updatedId, media])

  useEffect(() => {
    if (!updatedId) return

    async function fetchsimilarMedias() {
      try {
        const response = await fetch(
          `${
            media === 'movie'
              ? getMovieSimilars(updatedId as string)
              : getTvSimilars(updatedId as string)
          }`,
        )

        if (!response.ok) {
          throw new Error('Error getting similar movies')
        }

        const data = await response.json()

        const similarMedias = data?.results?.filter(
          (item: SimilarCardProps) => item.backdrop_path !== null,
        )

        setSimilarMedias(similarMedias.slice(0, 5))
      } catch (error) {
        console.error(error)
      }
    }

    fetchsimilarMedias()
  }, [updatedId, media])

  function convertRatingTo5Scale(ratingOutOf10: number) {
    return ratingOutOf10 * (5 / 10)
  }

  return (
    <LateralMenuWrapper>
      <OverlayBackground onClick={onClose} />
      <CloseButton onClick={onClose}>
        <X />
      </CloseButton>
      {mediaData?.detail ? (
        <Wrapper>
          <MovieContainer>
            <MovieContent>
              <MovieInfo>
                <MovieImage
                  src={`https://image.tmdb.org/t/p/original${mediaData?.detail?.poster_path}`}
                />
                <MovieDetails>
                  <Heading>
                    <h2>
                      {mediaData?.detail?.original_title ||
                        mediaData?.detail?.name}
                    </h2>
                    <p>{mediaData?.detail?.tagline}</p>
                  </Heading>
                  <Separator />
                  <MovieDetailsWrapper>
                    <RatingContainer>
                      <h2>
                        {convertRatingTo5Scale(
                          mediaData?.detail?.vote_average,
                        ).toFixed(2)}
                      </h2>
                      <StarsRating
                        rating={convertRatingTo5Scale(
                          mediaData?.detail?.vote_average,
                        )}
                      />
                    </RatingContainer>
                    <Separator />
                    <GeneralInfoContainer>
                      {media === 'tv' && (
                        <GeneralInfoItem>
                          <h2>Episodes</h2>
                          <p>{`${mediaData?.detail?.number_of_episodes}`}</p>
                        </GeneralInfoItem>
                      )}
                      {media === 'movie' && (
                        <GeneralInfoItem>
                          <h2>Length</h2>
                          <p>{`${mediaData?.detail?.runtime}min.`}</p>
                        </GeneralInfoItem>
                      )}
                      <GeneralInfoItem>
                        <h2>Language</h2>
                        <p>
                          {convertLanguageCodeToName(
                            mediaData?.detail?.original_language,
                          ) || '-'}
                        </p>
                      </GeneralInfoItem>
                      <GeneralInfoItem>
                        <h2>Year</h2>
                        {media === 'movie' ? (
                          <p>
                            {mediaData?.detail?.release_date?.split('-')[0]}
                          </p>
                        ) : (
                          <p>
                            {mediaData?.detail?.last_air_date?.split('-')[0]}
                          </p>
                        )}
                      </GeneralInfoItem>
                      <GeneralInfoItem>
                        <h2>Status</h2>
                        <p>{mediaData?.detail?.status?.split(' ')[0]}</p>
                      </GeneralInfoItem>
                    </GeneralInfoContainer>
                    <Separator />
                    <GenresContainer>
                      <h2>Genres</h2>
                      <GenresContent>
                        {mediaData?.detail?.genres?.length > 0 ? (
                          mediaData?.detail?.genres?.map((genre) => {
                            return (
                              <GenreItem key={genre.id}>{genre.name}</GenreItem>
                            )
                          })
                        ) : (
                          <p>N/A</p>
                        )}
                      </GenresContent>
                    </GenresContainer>
                  </MovieDetailsWrapper>
                </MovieDetails>
              </MovieInfo>
              <Separator />
              <VisibleSeparator />
              <SynopsisContainer>
                <p>{mediaData?.detail?.overview || 'N/A'}</p>
                <Separator />
                <VisibleSeparator />
                <LinksContainer>
                  <LinkItem href={mediaData?.detail?.homepage} target="_blank">
                    <span>Website</span>
                    <FontAwesomeIcon icon={faLink} />
                  </LinkItem>
                  <LinkItem
                    href={`https://www.imdb.com/title/${mediaData?.detail?.imdb_id}`}
                    target="_blank"
                  >
                    <span>IMDB</span>
                    <Icon icon="bxl:imdb" color="white" />
                  </LinkItem>
                </LinksContainer>
              </SynopsisContainer>
            </MovieContent>
            <ReviewSection results={reviewData?.results} />
            <SimilarContainer>
              <h2>You may also like</h2>
              <SimilarContent>
                {similarMedias &&
                  similarMedias.map((item) => {
                    return (
                      <SimilarCard
                        handleClick={() => setUpdatedId(item.id)}
                        id={item.id}
                        key={item.id}
                        release_date={
                          item?.release_date || item?.first_air_date
                        }
                        title={item?.title || item?.name}
                        backdrop_path={item?.backdrop_path}
                        media_type={media}
                      />
                    )
                  })}
              </SimilarContent>
            </SimilarContainer>
          </MovieContainer>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </LateralMenuWrapper>
  )
}
