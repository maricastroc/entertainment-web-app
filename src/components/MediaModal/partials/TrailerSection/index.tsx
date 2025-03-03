import {
  CloseButton,
  Content,
  Divider,
  Header,
  InfoContainer,
  InfoData,
  OverlayBackground,
  Wrapper,
} from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faTv } from '@fortawesome/free-solid-svg-icons'
import { DetailProps } from '../..'
import { X } from 'phosphor-react'

interface Props {
  media: string
  trailerLink: string
  mediaData: {
    detail: DetailProps | undefined
  }
  onClose: () => void
}

export function TrailerSection({
  media,
  mediaData,
  trailerLink,
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
                {mediaData?.detail?.last_air_date?.split('-')[0] ||
                  mediaData?.detail?.first_air_date?.split('-')[0] ||
                  mediaData?.detail?.release_date?.split('-')[0]}
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
            <h2>
              {mediaData?.detail?.original_title || mediaData?.detail?.name}
            </h2>
          </InfoContainer>
          <CloseButton onClick={onClose}>
            <X />
          </CloseButton>
        </Header>
        <Divider />
        <iframe
          src={`https://www.youtube.com/embed/${trailerLink}?autoplay=1&showinfo=0&rel=0&modestbranding=1&`}
          title="Trailer"
          frameBorder={0}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </Content>
    </Wrapper>
  )
}
