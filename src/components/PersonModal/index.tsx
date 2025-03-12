import { useEffect, useState } from 'react'

import {
  CloseButton,
  MediaContainer,
  MediaContent,
  MovieImage,
  MediaInfo,
  Separator,
  VisibleSeparator,
  Wrapper,
  LateralMenuWrapper,
  OverlayBackground,
  MovieImageWrapper,
  NotFoundImage,
} from './styles'
import { X } from 'phosphor-react'
import { LoadingComponent } from '../LoadingComponent'
import { MediaDetailsProps } from '@/types/media-details'

interface Props {
  id: string
  media_type: string
  onClose: () => void
}

export default function PersonModal({ id, media_type, onClose }: Props) {
  const [mediaData, setMediaData] = useState<MediaDetailsProps | undefined>()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    async function fetchData() {
      try {
        setIsLoading(true)

        const detailsResponse = await fetch(`/api/person/${id}`)

        const detailsData = await detailsResponse.json()

        setMediaData(detailsData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, media_type])

  return (
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
                {mediaData?.poster_path || mediaData?.profile_path ? (
                  <MovieImageWrapper>
                    <MovieImage
                      src={`https://image.tmdb.org/t/p/original${
                        mediaData?.poster_path || mediaData?.profile_path
                      }`}
                    />
                  </MovieImageWrapper>
                ) : (
                  <MovieImageWrapper>
                    <NotFoundImage>
                      <p>Not found</p>
                    </NotFoundImage>
                  </MovieImageWrapper>
                )}
              </MediaInfo>
              {mediaData?.overview && (
                <>
                  <Separator />
                  <VisibleSeparator />
                </>
              )}
            </MediaContent>

            {isLoading && <LoadingComponent hasOverlay />}
          </MediaContainer>
        </Wrapper>
      ) : (
        <LoadingComponent />
      )}
    </LateralMenuWrapper>
  )
}
