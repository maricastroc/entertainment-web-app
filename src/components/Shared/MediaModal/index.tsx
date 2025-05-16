/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import {
  CloseButton,
  MediaContainer,
  MediaContent,
  MediaImage,
  MediaInfo,
  Separator,
  SynopsisContainer,
  VisibleSeparator,
  Wrapper,
  LateralMenuWrapper,
  OverlayBackground,
  MediaImageWrapper,
  NotFoundImage,
} from './styles'
import { SimilarCardProps } from '@/components/Shared/SimilarCard'
import { X } from 'phosphor-react'
import { ReviewSection } from '../ReviewSection'
import { SimilarSection } from './partials/SimilarSection'
import { LinksSection } from './partials/LinksSection'
import { DetailsSection } from './partials/DetailsSection'
import { ModalSection } from './partials/ModalSection'
import { handleApiError } from '@/utils/handleApiError'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import useRequest from '@/utils/useRequest'
import { UserProps } from '@/types/user'
import { MediaDetailsProps } from '@/types/media-details'
import { ReviewDataProps } from '@/types/review-data'
import { CastProps } from '@/types/cast'
import { CrewProps } from '@/types/crew'
import { CreditsSection } from './partials/CreditsSection'
import { SaveButton } from '../SaveButton'
import { useAppContext } from '@/contexts/AppContext'
import { useSession } from 'next-auth/react'
import { MediaResultProps } from '@/types/media-result'
import { MOVIE_MEDIA, TV_MEDIA } from '@/utils/constants'
import { ModalSkeleton } from './partials/ModalSkeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
  id: string
  media_type: string
  onClose: () => void
  handleClickMedia: (mediaType: string, id: string) => void
}

export default function MediaModal({
  id,
  media_type,
  onClose,
  handleClickMedia,
}: Props) {
  const [castData, setCastData] = useState<CastProps[] | []>([])

  const [crewData, setCrewData] = useState<CrewProps[] | []>([])

  const [mediaData, setMediaData] = useState<MediaDetailsProps | undefined>()

  const [updatedId, setUpdatedId] = useState(id)

  const [similarMedias, setSimilarMedias] = useState<SimilarCardProps[] | []>()

  const [reviewData, setReviewData] = useState<ReviewDataProps | null>(null)

  const [trailerLink, setTrailerLink] = useState('')

  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false)

  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false)

  const [isInUserList, setIsInUserList] = useState(false)

  const { isLoading } = useAppContext()

  const { handleSetIsSignUpModalOpen, handleSetIsLoading } = useAppContext()

  const { status } = useSession()

  const { data, mutate, isValidating } = useRequest<UserProps | null>({
    url: '/profile',
    method: 'GET',
  })

  const {
    data: mediaResult,
    mutate: mediaMutate,
    isValidating: isValidatingMedia,
  } = useRequest<MediaResultProps | null>({
    url: `/${media_type}/${updatedId}`,
    method: 'GET',
  })

  async function handleMediaAction(action: 'save' | 'delete') {
    try {
      handleSetIsLoading(true)

      const mediaRoute = media_type === MOVIE_MEDIA ? 'movies' : 'series'
      const endpoint = `/user/${mediaRoute}`
      const options =
        action === 'save'
          ? { method: 'post', data: { mediaId: String(id) } }
          : { method: 'delete', data: { mediaId: String(id) } }

      const response = await api(endpoint, {
        ...options,
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.data) {
        toast.success(response.data.message)
        setIsInUserList(action === 'save')
        mutate()
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      handleSetIsLoading(false)
    }
  }

  useEffect(() => {
    if (!updatedId || !mediaResult) return

    setMediaData(mediaResult?.detail)

    setReviewData(mediaResult?.reviews)

    setCastData(mediaResult?.credits?.cast)

    setCrewData(mediaResult?.credits?.crew)

    const trailer = mediaResult?.videos?.results
      ?.filter((item: SimilarCardProps) => item.backdrop_path !== null)
      .slice(0, 1)

    setTrailerLink(trailer[0]?.key || '')

    const filteredSimilar = mediaResult?.similars?.results?.filter(
      (item: SimilarCardProps) => item.backdrop_path !== null,
    )

    setSimilarMedias(filteredSimilar.slice(0, 5))
  }, [updatedId, media_type, mediaResult])

  useEffect(() => {
    if (data?.savedMovies && media_type === MOVIE_MEDIA) {
      const savedMovies = data?.savedMovies?.map((movie) => movie.id)

      setIsInUserList(savedMovies.includes(String(id)))
    } else if (data?.savedSeries && media_type === TV_MEDIA) {
      const savedSeries = data?.savedSeries?.map((movie) => movie.id)

      setIsInUserList(savedSeries.includes(String(id)))
    }
  }, [media_type, id, data?.savedMovies, data?.savedSeries])

  useEffect(() => {
    if (isValidatingMedia || isValidating) {
      handleSetIsLoading(true)
    } else {
      handleSetIsLoading(false)
    }
  }, [isValidatingMedia, isValidating])

  return (isTrailerModalOpen && trailerLink?.length > 0) ||
    (isCreditsModalOpen && castData?.length > 0) ? (
    <ModalSection
      type={isTrailerModalOpen ? 'trailer' : 'credits'}
      media={media_type}
      mediaData={mediaData as MediaDetailsProps}
      trailerLink={trailerLink}
      castData={castData}
      crewData={crewData}
      handleClickMedia={handleClickMedia}
      onClose={() => {
        setIsTrailerModalOpen(false)
        setIsCreditsModalOpen(false)
      }}
    />
  ) : (
    <LateralMenuWrapper>
      <OverlayBackground onClick={onClose} />
      <Wrapper>
        <CloseButton onClick={onClose}>
          <X />
        </CloseButton>
        <MediaContainer>
          {isLoading || isValidatingMedia ? (
            <ModalSkeleton />
          ) : (
            <>
              <MediaContent>
                <MediaInfo>
                  {mediaData?.poster_path ? (
                    <MediaImageWrapper>
                      <MediaImage
                        src={`https://image.tmdb.org/t/p/original${mediaData?.poster_path}`}
                      />
                      <SaveButton
                        isInUserList={isInUserList}
                        onClick={() => {
                          if (status === 'authenticated') {
                            if (isInUserList) {
                              handleMediaAction('delete')
                            } else {
                              handleMediaAction('save')
                            }
                          } else {
                            handleSetIsSignUpModalOpen(true)
                          }
                        }}
                      />
                    </MediaImageWrapper>
                  ) : (
                    <MediaImageWrapper>
                      <NotFoundImage>
                        <p>Not found</p>
                      </NotFoundImage>
                    </MediaImageWrapper>
                  )}
                  {mediaData && (
                    <DetailsSection media={media_type} mediaData={mediaData} />
                  )}
                </MediaInfo>
                {mediaData?.overview && (
                  <>
                    <Separator />
                    <VisibleSeparator />
                    <SynopsisContainer>
                      <p>{mediaData?.overview}</p>
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
              </MediaContent>

              {castData?.length > 0 && (
                <CreditsSection
                  creditsType="cast"
                  castData={castData}
                  handleOpenModal={() => setIsCreditsModalOpen(true)}
                  crewData={crewData}
                  handleClickMedia={handleClickMedia}
                />
              )}

              {similarMedias && similarMedias?.length > 0 && (
                <SimilarSection
                  media={media_type}
                  similarMedias={similarMedias}
                  handleClick={(item) => setUpdatedId(item)}
                />
              )}

              <ReviewSection
                id={id}
                media={media_type}
                results={reviewData?.results}
                mutate={mediaMutate}
              />
            </>
          )}
        </MediaContainer>
      </Wrapper>
    </LateralMenuWrapper>
  )
}
