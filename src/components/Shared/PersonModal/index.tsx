import { useEffect, useState } from 'react'

import {
  CloseButton,
  MediaContainer,
  MediaContent,
  MovieImage,
  MediaInfo,
  Wrapper,
  LateralMenuWrapper,
  OverlayBackground,
  MovieImageWrapper,
  NotFoundImage,
} from './styles'
import { X } from 'phosphor-react'
import { LoadingComponent } from '@/components/Core/LoadingComponent'
import { PersonDataProps } from '@/types/person-data'
import { DetailsSection } from './DetailsSection'

interface Props {
  id: string
  media_type: string
  onClose: () => void
}

export default function PersonModal({ id, media_type, onClose }: Props) {
  const [personData, setPersonData] = useState<PersonDataProps | undefined>()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    async function fetchData() {
      try {
        setIsLoading(true)

        const response = await fetch(`/api/person/${id}`)

        const data = await response.json()

        setPersonData(data?.detail)
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
      {personData ? (
        <Wrapper>
          <CloseButton onClick={onClose}>
            <X />
          </CloseButton>
          <MediaContainer>
            <MediaContent>
              <MediaInfo>
                {personData?.profile_path ? (
                  <MovieImageWrapper>
                    <MovieImage
                      src={`https://image.tmdb.org/t/p/original${personData?.profile_path}`}
                    />
                  </MovieImageWrapper>
                ) : (
                  <MovieImageWrapper>
                    <NotFoundImage>
                      <p>Not found</p>
                    </NotFoundImage>
                  </MovieImageWrapper>
                )}

                <DetailsSection personData={personData} />
              </MediaInfo>
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
