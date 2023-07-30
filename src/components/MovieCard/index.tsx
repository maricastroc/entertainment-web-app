import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  BackgroundImage,
  CardInfo,
  CardInfoData,
  CardInfoTitle,
  Container,
} from './styles'
import { faFilm, faTv } from '@fortawesome/free-solid-svg-icons'
import { getFullYear } from '@/utils/getFullYear'

export interface MovieCardProps {
  id: string
  backdrop_path: string
  release_date: string
  media_type: string
  title: string
}

export function MovieCard({
  backdrop_path,
  release_date,
  media_type,
  title,
}: MovieCardProps) {
  return (
    <Container>
      <BackgroundImage
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt=""
      />
      <CardInfo>
        <CardInfoData>
          <p>{getFullYear(release_date)}</p>
          <span>•</span>
          {media_type === 'Movie' ? (
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
        </CardInfoData>
        <CardInfoTitle>{title}</CardInfoTitle>
      </CardInfo>
    </Container>
  )
}
