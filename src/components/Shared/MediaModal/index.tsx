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
import { LoadingComponent } from '@/components/Core/LoadingComponent'
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

interface Props {
  id: string
  media_type: string
  onClose: () => void
}

export default function MediaModal({ id, media_type, onClose }: Props) {
  const [castData, setCastData] = useState<CastProps[] | []>([])

  const [crewData, setCrewData] = useState<CrewProps[] | []>([])

  const [mediaData, setMediaData] = useState<MediaDetailsProps | undefined>()

  const [updatedId, setUpdatedId] = useState(id)

  const [similarMedias, setSimilarMedias] = useState<SimilarCardProps[] | []>()

  const [reviewData, setReviewData] = useState<ReviewDataProps | null>(null)

  const [trailerLink, setTrailerLink] = useState('')

  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false)

  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [isInUserList, setIsInUserList] = useState(false)

  const { handleSetIsSignUpModalOpen } = useAppContext()

  const { status } = useSession()

  const media = media_type === 'movie' ? 'movie' : 'tv'

  const { data, mutate, isValidating } = useRequest<UserProps | null>({
    url: '/profile',
    method: 'GET',
  })

  async function handleMediaAction(action: 'save' | 'delete') {
    try {
      setIsLoading(true)

      const mediaRoute = media === 'movie' ? 'movies' : 'series'
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
        const response = await fetch(`/api/${media_type}/${updatedId}`)

        const data = await response.json()

        setMediaData(data?.detail)

        setReviewData(data?.reviews)

        setCastData(data?.credits?.cast)

        setCrewData(data?.credits?.crew)

        const trailer = data?.videos?.results
          ?.filter((item: SimilarCardProps) => item.backdrop_path !== null)
          .slice(0, 1)

        setTrailerLink(trailer[0]?.key || '')

        const filteredSimilar = data?.similars?.results?.filter(
          (item: SimilarCardProps) => item.backdrop_path !== null,
        )

        setSimilarMedias(filteredSimilar.slice(0, 5))
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    fetchData()
  }, [updatedId, media_type])

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
    (isCreditsModalOpen && castData?.length > 0) ? (
    <ModalSection
      type={isTrailerModalOpen ? 'trailer' : 'credits'}
      media={media}
      mediaData={mediaData as MediaDetailsProps}
      trailerLink={trailerLink}
      castData={castData}
      crewData={crewData}
      onClose={() => {
        setIsTrailerModalOpen(false)
        setIsCreditsModalOpen(false)
      }}
    />
  ) : (
    <LateralMenuWrapper>
      <OverlayBackground onClick={onClose} />
      {mediaData ? (
        <Wrapper>
          <CloseButton onClick={onClose}>
            <X />
          </CloseButton>
          <MediaContainer>
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
                <DetailsSection media={media} mediaData={mediaData} />
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
          </MediaContainer>
        </Wrapper>
      ) : (
        <LoadingComponent />
      )}
    </LateralMenuWrapper>
  )
}
