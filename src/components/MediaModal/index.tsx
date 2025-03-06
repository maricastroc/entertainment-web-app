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
  getMovieCredits,
  getTvCredits,
} from '@/lib/tmdb'
import { ReviewProps } from '@/types/review'
import { SimilarCardProps } from '@/components/SimilarCard'
import { X } from 'phosphor-react'
import { ReviewSection } from '../ReviewSection'
import { SimilarSection } from './partials/SimilarSection'
import { LinksSection } from './partials/LinksSection'
import { DetailsSection } from './partials/DetailsSection'
import { ModalSection } from './partials/ModalSection'
import { LoadingComponent } from '../LoadingComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { handleApiError } from '@/utils/handleApiError'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import useRequest from '@/utils/useRequest'
import { UserProps } from '@/types/user'
import { CastSection } from './partials/CastSection'

interface Props {
  id: string
  media_type: string
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

export interface CastCardProps {
  profile_path: string
  name: string
  character: string
}

export default function MediaModal({ id, media_type, onClose }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  const [castData, setCastData] = useState<CastCardProps[] | []>([])

  const [mediaData, setMediaData] = useState<MediaDataProps | undefined>()

  const [updatedId, setUpdatedId] = useState(id)

  const [similarMedias, setSimilarMedias] = useState<SimilarCardProps[] | []>()

  const [reviewData, setReviewData] = useState<ReviewDataProps | null>(null)

  const [trailerLink, setTrailerLink] = useState('')

  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false)

  const [isCastModalOpen, setIsCastModalOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [isInUserList, setIsInUserList] = useState(false)

  const media = media_type === 'movie' ? 'movie' : 'tv'

  const { data, mutate, isValidating } = useRequest<UserProps | null>({
    url: '/profile',
    method: 'GET',
  })

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

    async function fetchData() {
      try {
        const detailsResponse = await fetch(`/api/${media}/${updatedId}`)

        const detailsData = await detailsResponse.json()

        setMediaData(detailsData)

        const reviewsResponse = await fetch(
          media === 'movie'
            ? getMovieReviews(updatedId as string)
            : getTvReviews(updatedId as string),
        )

        if (!reviewsResponse.ok) {
          toast.error('Error during reviews loading!')
        }

        const reviewsData = await reviewsResponse.json()

        setReviewData(reviewsData)

        const similarResponse = await fetch(
          media === 'movie'
            ? getMovieSimilars(updatedId as string)
            : getTvSimilars(updatedId as string),
        )

        if (!similarResponse.ok) {
          throw new Error('Error during recommendations loading!')
        }

        const similarData = await similarResponse.json()

        const filteredSimilar = similarData?.results?.filter(
          (item: SimilarCardProps) => item.backdrop_path !== null,
        )

        setSimilarMedias(filteredSimilar.slice(0, 5))
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    fetchData()
  }, [updatedId, media])

  useEffect(() => {
    if (!updatedId) return

    async function fetchCreditsAndTrailer() {
      try {
        const creditsResponse = await fetch(
          media === 'movie'
            ? getMovieCredits(updatedId as string)
            : getTvCredits(updatedId as string),
        )

        if (!creditsResponse.ok) {
          toast.error('Error loading credits')
        }

        const creditsData = await creditsResponse.json()

        console.log(creditsData)
        setCastData(creditsData.cast)

        const trailerResponse = await fetch(
          media === 'movie'
            ? getMovieVideos(updatedId as string)
            : getTvVideos(updatedId as string),
        )

        if (!trailerResponse.ok) {
          toast.error('Error loading trailer')
        }

        const trailerData = await trailerResponse.json()
        const trailer = trailerData?.results
          ?.filter((item: SimilarCardProps) => item.backdrop_path !== null)
          .slice(0, 1)

        setTrailerLink(trailer[0]?.key || '')
      } catch (error) {
        console.error(error)
      }
    }

    fetchCreditsAndTrailer()
  }, [updatedId, media])

  useEffect(() => {
    if (data?.savedMovies && media === 'movie') {
      const savedMovies = data?.savedMovies?.map((movie) => movie.id)

      setIsInUserList(savedMovies.includes(String(id)))
    } else if (data?.savedSeries && media === 'tv') {
      const savedSeries = data?.savedSeries?.map((movie) => movie.id)

      setIsInUserList(savedSeries.includes(String(id)))
    }
  }, [media, id, data?.savedMovies, data?.savedSeries])

  return (isTrailerModalOpen && trailerLink?.length > 0) ||
    (isCastModalOpen && castData?.length > 0) ? (
    <ModalSection
      type={isTrailerModalOpen ? 'trailer' : 'cast'}
      media={media}
      mediaData={mediaData as MediaDataProps}
      trailerLink={trailerLink}
      castData={castData}
      onClose={() => {
        setIsTrailerModalOpen(false)
        setIsCastModalOpen(false)
      }}
    />
  ) : (
    <LateralMenuWrapper>
      <OverlayBackground onClick={onClose} />
      {mediaData?.detail ? (
        <Wrapper>
          <CloseButton onClick={onClose}>
            <X />
          </CloseButton>
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

            {castData?.length > 0 && (
              <CastSection
                handleOpenModal={() => setIsCastModalOpen(true)}
                castData={castData}
              />
            )}

            {similarMedias && similarMedias?.length > 0 && (
              <SimilarSection
                media={media}
                similarMedias={similarMedias}
                handleClick={(item) => setUpdatedId(item)}
              />
            )}

            <ReviewSection results={reviewData?.results} />

            {(isLoading || isValidating) && <LoadingComponent hasOverlay />}
          </MovieContainer>
        </Wrapper>
      ) : (
        <LoadingComponent />
      )}
    </LateralMenuWrapper>
  )
}
