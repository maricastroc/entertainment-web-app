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
import { PersonMediaSection } from './PersonMediaSection'
import { SimilarCardProps } from '../SimilarCard'

interface Props {
  id: string
  mediaType: string
  knownFor?: SimilarCardProps[] | null
  handleClickMedia: (mediaType: string, id: string) => void
  onClose: () => void
}

export default function PersonModal({
  id,
  mediaType,
  knownFor,
  handleClickMedia,
  onClose,
}: Props) {
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
  }, [id, mediaType])

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
              {knownFor && knownFor?.length > 0 && (
                <PersonMediaSection
                  personMedias={knownFor}
                  handleClickMedia={(type: string, id: string) =>
                    handleClickMedia(type, id)
                  }
                />
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
