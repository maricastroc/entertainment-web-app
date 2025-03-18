import { faCirclePlay, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LinkItem, LinksContainer } from './styles'
import { Icon } from '@iconify/react/dist/iconify.js'
import { MediaDetailsProps } from '@/types/media-details'

interface Props {
  handleClick: () => void
  hasTrailer: boolean
  mediaData: MediaDetailsProps
}

export function LinksSection({ mediaData, hasTrailer, handleClick }: Props) {
  return (
    <LinksContainer>
      {mediaData?.homepage && (
        <LinkItem href={mediaData?.homepage} target="_blank">
          <span>Website</span>
          <FontAwesomeIcon icon={faLink} />
        </LinkItem>
      )}
      {mediaData?.imdb_id && (
        <LinkItem
          href={`https://www.imdb.com/title/${mediaData?.imdb_id}`}
          target="_blank"
        >
          <span>IMDB</span>
          <Icon icon="bxl:imdb" color="white" />
        </LinkItem>
      )}
      {hasTrailer && (
        <LinkItem onClick={handleClick}>
          <span>Trailer</span>
          <FontAwesomeIcon icon={faCirclePlay} />
        </LinkItem>
      )}
    </LinksContainer>
  )
}
