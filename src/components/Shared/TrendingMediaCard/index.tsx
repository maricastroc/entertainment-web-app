/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  BackgroundImage,
  CardInfo,
  CardInfoData,
  CardInfoTitle,
  Container,
  Wrapper,
} from './styles'
import IconMovie from '../../../public/assets/icon-category-movie.svg'
import IconTv from '../../../public/assets/icon-category-tv.svg'
import { getFullYear } from '@/utils/getFullYear'
import { MediaCardProps } from '@/pages/home/index.page'
import Loading from '@/components/Core/Loading'
import Image from 'next/image'

export function TrendingMediaCard({
  backdrop_path,
  poster_path,
  first_air_date,
  release_date,
  media_type,
  name,
  title,
  handleClick,
}: MediaCardProps) {
  return (
    <Wrapper>
      {name || title ? (
        <Container onClick={handleClick}>
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
            <CardInfoTitle>{name || title}</CardInfoTitle>
          </CardInfo>
        </Container>
      ) : (
        <Loading />
      )}
    </Wrapper>
  )
}
