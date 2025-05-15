import { useEffect, useState } from 'react'

import {
  CloseButton,
  PersonContainer,
  PersonContent,
  PersonImage,
  PersonInfo,
  Wrapper,
  LateralMenuWrapper,
  OverlayBackground,
  PersonImageWrapper,
  NotFoundImage,
  BiographyContainer,
  Separator,
  VisibleSeparator,
} from './styles'
import { X } from 'phosphor-react'
import { LoadingComponent } from '@/components/Core/LoadingComponent'
import { PersonDataProps } from '@/types/person-data'
import { DetailsSection } from './DetailsSection'
import { SimilarCardProps } from '../SimilarCard'
import { MoviesSection } from './MoviesSection'
import { PersonSocialDataProps } from '@/types/person-social-media'
import { TvSection } from './TvSection'

interface Props {
  id: string
  mediaType: string
  handleClickMedia: (mediaType: string, id: string) => void
  onClose: () => void
}

export default function PersonModal({
  id,
  mediaType,
  handleClickMedia,
  onClose,
}: Props) {
  const [personData, setPersonData] = useState<PersonDataProps | undefined>()

  const [socialData, setSocialData] = useState<PersonSocialDataProps | null>(
    null,
  )

  const [movieCredits, setMovieCredits] = useState<SimilarCardProps[] | null>()

  const [tvCredits, setTvCredits] = useState<SimilarCardProps[] | null>()

  const [isLoading, setIsLoading] = useState(false)

  function formatText(text: string) {
    const paragraphs = text.trim().split('\n\n')
    return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
  }

  useEffect(() => {
    if (!id) return

    async function fetchData() {
      try {
        setIsLoading(true)

        const response = await fetch(`/api/person/${id}`)

        const data = await response.json()

        setPersonData(data?.detail)
        setSocialData(data?.social)
        setMovieCredits(data?.movieCredits?.cast)
        setTvCredits(data?.tvCredits?.cast)
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
          <PersonContainer>
            <PersonContent>
              <PersonInfo>
                {personData?.profile_path ? (
                  <PersonImageWrapper>
                    <PersonImage
                      src={`https://image.tmdb.org/t/p/original${personData?.profile_path}`}
                    />
                  </PersonImageWrapper>
                ) : (
                  <PersonImageWrapper>
                    <NotFoundImage>
                      <p>Not found</p>
                    </NotFoundImage>
                  </PersonImageWrapper>
                )}

                <DetailsSection
                  personData={personData}
                  socialData={socialData}
                />
              </PersonInfo>

              <Separator />
              <VisibleSeparator />
              <BiographyContainer>
                {formatText(personData?.biography || 'No biography available.')}
              </BiographyContainer>
              <Separator />
              <VisibleSeparator />

              {movieCredits && movieCredits?.length > 0 && (
                <MoviesSection
                  movies={movieCredits}
                  handleClickMedia={(type: string, id: string) =>
                    handleClickMedia(type, id)
                  }
                />
              )}
              <Separator />
              <VisibleSeparator />
              {tvCredits && tvCredits?.length > 0 && (
                <TvSection
                tvSeries={tvCredits}
                  handleClickMedia={(type: string, id: string) =>
                    handleClickMedia(type, id)
                  }
                />
              )}
            </PersonContent>

            {isLoading && <LoadingComponent hasOverlay />}
          </PersonContainer>
        </Wrapper>
      ) : (
        <LoadingComponent />
      )}
    </LateralMenuWrapper>
  )
}
