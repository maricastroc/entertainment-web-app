import {
  CloseButton,
  Content,
  Divider,
  Header,
  InfoContainer,
  InfoData,
  OverlayBackground,
  Wrapper,
  CastCard,
  CastContainer,
  CastInfo,
  CastWrapper,
  CreditsContainer,
} from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faTv } from '@fortawesome/free-solid-svg-icons'
import { X } from 'phosphor-react'
import { MediaDetailsProps } from '@/types/media-details'
import { CastProps } from '@/types/cast'
import { CrewProps } from '@/types/crew'
import { MOVIE_MEDIA } from '@/utils/constants'

interface Props {
  media: string
  type: 'trailer' | 'credits'
  trailerLink?: string
  mediaData: MediaDetailsProps | undefined
  castData?: CastProps[] | []
  crewData?: CrewProps[] | []
  onClose: () => void
    handleClickMedia?: (mediaType: string, id: string) => void
}

interface CastOrCrewProps {
  data: CastProps[] | CrewProps[]
  type: 'Cast' | 'Crew'
      handleClickMedia?: (mediaType: string, id: string) => void
}

const CastOrCrewSection = ({ data, type, handleClickMedia }: CastOrCrewProps) => {
  return (
    <CastWrapper>
      <h2>{type}</h2>
      <CastContainer>
        {data?.map((item, index) => (
          <CastCard key={index}>
            <div>
              <img
                src={
                  item?.profile_path
                    ? `https://image.tmdb.org/t/p/original/${item.profile_path}`
                    : 'https://github.com/octocat.png'
                }
                alt={item?.name || 'Profile Image'}
                onClick={() => {
                  if (handleClickMedia) {
                    handleClickMedia('person', item.id)
                  }
                }}
              />
            </div>
            <CastInfo>
              <p>{item.name}</p>
              <span>
                {type === 'Cast' ? item?.character : item?.known_for_department}
              </span>
            </CastInfo>
          </CastCard>
        ))}
      </CastContainer>
    </CastWrapper>
  )
}

export function ModalSection({
  media,
  mediaData,
  trailerLink,
  castData,
  crewData,
  type,
  handleClickMedia,
  onClose,
}: Props) {
  return (
    <Wrapper>
      <OverlayBackground onClick={onClose} />
      <Content>
        <Header>
          <InfoContainer>
            <InfoData>
              <p>
                {mediaData?.last_air_date?.split('-')[0] ||
                  mediaData?.first_air_date?.split('-')[0] ||
                  mediaData?.release_date?.split('-')[0]}
              </p>
              <span>•</span>
              {media === MOVIE_MEDIA ? (
                <p>
                  <FontAwesomeIcon icon={faFilm} />
                  Movie
                </p>
              ) : (
                <p>
                  <FontAwesomeIcon icon={faTv} />
                  TV Series
                </p>
              )}
            </InfoData>
            <h2>{mediaData?.original_title || mediaData?.name}</h2>
          </InfoContainer>
          <CloseButton onClick={onClose}>
            <X />
          </CloseButton>
        </Header>
        <Divider />
        {type === 'trailer' && (
          <iframe
            src={`https://www.youtube.com/embed/${trailerLink}?autoplay=1&showinfo=0&rel=0&modestbranding=1&`}
            title="Trailer"
            frameBorder={0}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}

        <CreditsContainer>
          {type === 'credits' && castData && castData?.length > 0 && (
            <CastOrCrewSection handleClickMedia={handleClickMedia} data={castData} type="Cast" />
          )}

          {type === 'credits' && crewData && crewData?.length > 0 && (
            <CastOrCrewSection handleClickMedia={handleClickMedia} data={crewData} type="Crew" />
          )}
        </CreditsContainer>
      </Content>
    </Wrapper>
  )
}
