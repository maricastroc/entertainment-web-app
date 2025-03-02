import {
  BackgroundImage,
  CardInfo,
  CardInfoData,
  CardInfoTitle,
  Container,
  NotFound,
} from './styles'
import { getFullYear } from '@/utils/getFullYear'
import { MediaCardProps } from '@/pages/home/index.page'
import IconMovie from '../../../public/assets/icon-category-movie.svg'
import IconTv from '../../../public/assets/icon-category-tv.svg'
import Image from 'next/image'

export function MediaCard({
  backdrop_path,
  first_air_date,
  media_type,
  name,
  handleClick,
}: MediaCardProps) {
  return (
    <Container onClick={handleClick}>
      {backdrop_path ? (
        <BackgroundImage
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt=""
        />
      ) : (
        <NotFound>
          <p>Not found</p>
        </NotFound>
      )}
      <CardInfo>
        <CardInfoData>
          {first_air_date ? <p>{getFullYear(first_air_date)}</p> : <p>N/A</p>}
          <span>•</span>
          {media_type === 'movie' ? (
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
        <CardInfoTitle>{name}</CardInfoTitle>
      </CardInfo>
    </Container>
  )
}
