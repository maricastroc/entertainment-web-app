/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  BackgroundImage,
  CardInfo,
  CardInfoData,
  CardInfoTitle,
  Container,
  Wrapper,
} from './styles'
import { faFilm, faTv } from '@fortawesome/free-solid-svg-icons'
import { getFullYear } from '@/utils/getFullYear'
import { MediaCardProps } from '@/pages/home/index.page'
import Loading from '../Loading'

export function TrendingMediaCard({
  backdrop_path,
  poster_path,
  first_air_date,
  release_date,
  media_type,
  name,
  title,
}: MediaCardProps) {
  return (
    <Wrapper>
      {name || title ? (
        <Container>
          <BackgroundImage
            src={
              `https://image.tmdb.org/t/p/w500${backdrop_path}` ||
              `https://image.tmdb.org/t/p/w500${poster_path}`
            }
            alt=""
          />
          <CardInfo>
            <CardInfoData>
              {first_air_date ? (
                <p>{getFullYear(first_air_date)}</p>
              ) : (
                <p>{getFullYear(release_date!)}</p>
              )}
              <span>•</span>
              {media_type === 'movie' ? (
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
            <CardInfoTitle>{name || title}</CardInfoTitle>
          </CardInfo>
        </Container>
      ) : (
        <Loading />
      )}
    </Wrapper>
  )
}
