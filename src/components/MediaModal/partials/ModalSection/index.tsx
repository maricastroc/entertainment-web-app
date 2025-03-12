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
} from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faTv } from '@fortawesome/free-solid-svg-icons'
import { X } from 'phosphor-react'
import { MediaDetailsProps } from '@/types/media-details'
import { CastProps } from '@/types/cast'

interface Props {
  media: string
  type: 'trailer' | 'cast'
  trailerLink?: string
  mediaData: MediaDetailsProps | undefined
  castData?: CastProps[] | []
  onClose: () => void
}

export function ModalSection({
  media,
  mediaData,
  trailerLink,
  castData,
  type,
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
              {media === 'movie' ? (
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

        {type === 'cast' && (
          <CastWrapper>
            <h2>Cast</h2>
            <CastContainer>
              {castData?.map((item, index) => {
                return (
                  <CastCard key={index}>
                    <div>
                      <img
                        src={
                          item?.profile_path
                            ? `https://image.tmdb.org/t/p/original/${item.profile_path}`
                            : 'https://github.com/octocat.png'
                        }
                        alt={item?.name || 'Imagem de perfil'}
                      />
                    </div>
                    <CastInfo>
                      <p>{item.name}</p>
                      <span>{item.character}</span>
                    </CastInfo>
                  </CastCard>
                )
              })}
            </CastContainer>
          </CastWrapper>
        )}
      </Content>
    </Wrapper>
  )
}
