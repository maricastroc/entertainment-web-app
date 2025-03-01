import { faCirclePlay, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LinkItem, LinksContainer } from './styles'
import { Icon } from '@iconify/react/dist/iconify.js'
import { DetailProps } from '../..'

interface Props {
  handleClick: () => void
  hasTrailer: boolean
  mediaData: {
    detail: DetailProps
  }
}

export function LinksSection({ mediaData, hasTrailer, handleClick }: Props) {
  return (
    <LinksContainer>
      <LinkItem href={mediaData?.detail?.homepage} target="_blank">
        <span>Website</span>
        <FontAwesomeIcon icon={faLink} />
      </LinkItem>
      <LinkItem
        href={`https://www.imdb.com/title/${mediaData?.detail?.imdb_id}`}
        target="_blank"
      >
        <span>IMDB</span>
        <Icon icon="bxl:imdb" color="white" />
      </LinkItem>
      {hasTrailer && (
        <LinkItem onClick={handleClick}>
          <span>Trailer</span>
          <FontAwesomeIcon icon={faCirclePlay} />
        </LinkItem>
      )}
    </LinksContainer>
  )
}
