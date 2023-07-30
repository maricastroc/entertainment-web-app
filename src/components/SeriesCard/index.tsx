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

export interface SeriesCardProps {
  id: string
  backdrop_path?: string
  poster_path?: string
  first_air_date: string
  media_type: string
  name: string
}

export function SeriesCard({
  backdrop_path,
  first_air_date,
  media_type,
  name,
}: SeriesCardProps) {
  return (
    <Container>
      <BackgroundImage
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt=""
      />
      <CardInfo>
        <CardInfoData>
          <p>{getFullYear(first_air_date)}</p>
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
        <CardInfoTitle>{name}</CardInfoTitle>
      </CardInfo>
    </Container>
  )
}
