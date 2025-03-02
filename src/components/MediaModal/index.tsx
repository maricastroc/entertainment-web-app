/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

import {
  CloseButton,
  MovieContainer,
  MovieContent,
  MovieImage,
  MovieInfo,
  Separator,
  SynopsisContainer,
  VisibleSeparator,
  Wrapper,
  LateralMenuWrapper,
  OverlayBackground,
  MovieImageWrapper,
  SaveBtn,
  NotFoundImage,
} from './styles'

import {
  getMovieSimilars,
  getMovieReviews,
  getTvSimilars,
  getTvReviews,
  getMovieVideos,
  getTvVideos,
} from '@/lib/tmdb'
import { ReviewProps } from '@/types/review'
import { SimilarCardProps } from '@/components/SimilarCard'
import { X } from 'phosphor-react'
import { ReviewSection } from '../ReviewSection'
import { SimilarSection } from './partials/SimilarSection'
import { LinksSection } from './partials/LinksSection'
import { DetailsSection } from './partials/DetailsSection'
import { TrailerSection } from './partials/TrailerSection'
import { LoadingComponent } from '../LoadingComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { handleApiError } from '@/utils/handleApiError'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'

interface Props {
  id: string
  media_type: string
  savedSeries?: string[] | null
  savedMovies?: string[] | null
  mutate?: any
  onClose: () => void
}

export interface SpokenLanguagesProps {
  name: string
}

export interface GenresProps {
  id: number
  name: string
}

export interface DetailProps {
  original_title: string
  overview: string
  name: string
  tagline: string
  poster_path: string
  vote_average: number
  number_of_episodes?: number
  runtime: number
  release_date: string
  first_air_date?: string
  backdrop_path?: string
  vote_count?: number
  last_air_date?: string
  spoken_languages: SpokenLanguagesProps[]
  status: string
  genres: GenresProps[]
  homepage: string
  imdb_id: string
  original_language: string
}

export interface MediaDataProps {
  detail: DetailProps
}

export interface ReviewDataProps {
  id: string
  page: number
  results: ReviewProps[]
  total_pages: number
  total_results: number
}

export default function MediaModal({
  id,
  media_type,
  savedMovies = null,
  savedSeries = null,
  mutate,
  onClose,
}: Props) {
  const [isHovered, setIsHovered] = useState(false)

  const [mediaData, setMediaData] = useState<MediaDataProps | undefined>()

  const [updatedId, setUpdatedId] = useState(id)

  const [similarMedias, setSimilarMedias] = useState<SimilarCardProps[] | []>()

  const [reviewData, setReviewData] = useState<ReviewDataProps | null>(null)

  const [trailerLink, setTrailerLink] = useState('')

  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [isInUserList, setIsInUserList] = useState(false)

  const media = media_type === 'movie' ? 'movie' : 'tv'

  async function saveMedia() {
    try {
      setIsLoading(true)

      const mediaRoute = media === 'movie' ? 'movies' : 'series'

      const response = await api.post(
        `/user/${mediaRoute}`,
        { mediaId: String(id) },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.data) {
        toast.success(response.data.message)
        setIsInUserList(true)
        mutate && mutate()
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteMedia() {
    try {
      setIsLoading(true)

      const mediaRoute = media === 'movie' ? 'movies' : 'series'

      const response = await api.delete(`/user/${mediaRoute}`, {
        data: { mediaId: String(id) },
      })

      if (response.data) {
        toast.success(response.data.message)
        setIsInUserList(false)
        mutate && mutate()
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

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

    async function fetchSimilarMedias() {
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

    fetchSimilarMedias()
  }, [updatedId, media])

  useEffect(() => {
    if (!updatedId) return

    async function fetchTrailerLink() {
      try {
        const response = await fetch(
          `${
            media === 'movie'
              ? getMovieVideos(updatedId as string)
              : getTvVideos(updatedId as string)
          }`,
        )

        if (!response.ok) {
          throw new Error('Error getting trailer link')
        }

        const data = await response.json()

        const trailer = data?.results
          ?.filter((item: SimilarCardProps) => item.backdrop_path !== null)
          .slice(0, 1)

        setTrailerLink(trailer[0]?.key || '')
      } catch (error) {
        console.error(error)
      }
    }

    fetchTrailerLink()
  }, [updatedId, media])

  useEffect(() => {
    if (savedMovies && media === 'movie') {
      setIsInUserList(savedMovies.includes(id))
    } else if (savedSeries && media === 'tv') {
      setIsInUserList(savedSeries.includes(id))
    }
  }, [media, id, savedMovies, savedSeries])

  return isTrailerModalOpen && trailerLink?.length > 0 ? (
    <TrailerSection
      media={media}
      mediaData={mediaData as MediaDataProps}
      trailerLink={trailerLink}
      onClose={() => setIsTrailerModalOpen(false)}
    />
  ) : (
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
                {mediaData?.detail?.poster_path ? (
                  <MovieImageWrapper>
                    <MovieImage
                      src={`https://image.tmdb.org/t/p/original${mediaData?.detail?.poster_path}`}
                    />
                    <SaveBtn
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() => {
                        if (isInUserList) {
                          deleteMedia()
                        } else {
                          saveMedia()
                        }
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          isHovered || isInUserList
                            ? faBookmarkSolid
                            : faBookmarkRegular
                        }
                      />
                    </SaveBtn>
                  </MovieImageWrapper>
                ) : (
                  <MovieImageWrapper>
                    <NotFoundImage>
                      <p>Not found</p>
                    </NotFoundImage>
                  </MovieImageWrapper>
                )}
                <DetailsSection media={media} mediaData={mediaData} />
              </MovieInfo>
              {mediaData?.detail?.overview && (
                <>
                  <Separator />
                  <VisibleSeparator />
                  <SynopsisContainer>
                    <p>{mediaData?.detail?.overview}</p>
                    <Separator />
                    <VisibleSeparator />
                    <LinksSection
                      hasTrailer={trailerLink?.length > 0}
                      mediaData={mediaData}
                      handleClick={() => setIsTrailerModalOpen(true)}
                    />
                  </SynopsisContainer>
                </>
              )}
            </MovieContent>

            {similarMedias && similarMedias?.length > 0 && (
              <SimilarSection
                media={media}
                similarMedias={similarMedias}
                handleClick={(item) => setUpdatedId(item)}
              />
            )}

            <ReviewSection results={reviewData?.results} />

            {isLoading && <LoadingComponent hasOverlay />}
          </MovieContainer>
        </Wrapper>
      ) : (
        <LoadingComponent />
      )}
    </LateralMenuWrapper>
  )
}
