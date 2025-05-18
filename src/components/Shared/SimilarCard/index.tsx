import {
  BackgroundImage,
  CardInfo,
  CardInfoData,
  CardInfoTitle,
  Container,
} from './styles'
import IconMovie from '../../../../public/assets/icon-category-movie.svg'
import IconTv from '../../../../public/assets/icon-category-tv.svg'
import { getFullYear } from '@/utils/getFullYear'
import Image from 'next/image'
import { MOVIE_MEDIA } from '@/utils/constants'
import { NotFoundImage } from '@/styles/shared'

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
        <NotFoundImage>Not found</NotFoundImage>
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
              Series
            </p>
          )}
        </CardInfoData>
        <CardInfoTitle>{title}</CardInfoTitle>
      </CardInfo>
    </Container>
  )
}
