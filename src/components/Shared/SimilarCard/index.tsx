import {
  BackgroundImage,
  CardInfo,
  CardInfoData,
  CardInfoTitle,
  Container,
  NotFoundImage,
} from './styles'
import IconMovie from '../../../../public/assets/icon-category-movie.svg'
import IconTv from '../../../../public/assets/icon-category-tv.svg'
import { getFullYear } from '@/utils/getFullYear'
import Image from 'next/image'
import { MOVIE_MEDIA } from '@/utils/constants'

export interface SimilarCardProps {
  key: string
  backdrop_path?: string
  release_date?: string
  first_air_date?: string
  media_type: string
  title?: string
  name?: string
  id: string
  handleClick: () => void
}

export function SimilarCard({
  backdrop_path,
  release_date,
  media_type,
  title,
  handleClick,
}: SimilarCardProps) {
  return (
    <Container onClick={handleClick}>
      {backdrop_path ? (
        <BackgroundImage
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt=""
        />
      ) : (
        <NotFoundImage
          alt=""
          src="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMzMzIiBvZmZzZXQ9IjIwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzIyMiIgb2Zmc2V0PSI1MCUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iNzAlIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMzMzMiIC8+CiAgPHJlY3QgaWQ9InIiIHdpZHRoPSIyNDAiIGhlaWdodD0iMTQwIiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItMjQwIiB0bz0iMjQwIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIC8+Cjwvc3ZnPgo="
        />
      )}
      <CardInfo>
        <CardInfoData>
          {release_date && <p>{getFullYear(release_date)}</p>}
          <span>•</span>
          {media_type === MOVIE_MEDIA ? (
            <p>
              <Image alt="" src={IconMovie} />
              Movie
            </p>
          ) : (
            <p>
              <Image alt="" src={IconTv} />
              TV Series
            </p>
          )}
        </CardInfoData>
        <CardInfoTitle>{title}</CardInfoTitle>
      </CardInfo>
    </Container>
  )
}
