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
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
          {(() => {
            switch (media_type) {
              case 'movie':
                return (
                  <p>
                    <Image alt="" src={IconMovie} />
                    Movie
                  </p>
                )
              case 'tv':
                return (
                  <p>
                    <Image alt="" src={IconTv} />
                    TV Series
                  </p>
                )
              case 'person':
                return (
                  <p>
                    <FontAwesomeIcon icon={faPerson} />
                    Person
                  </p>
                )
              default:
                return <p>N/A</p>
            }
          })()}
        </CardInfoData>
        <CardInfoTitle>{name}</CardInfoTitle>
      </CardInfo>
    </Container>
  )
}
