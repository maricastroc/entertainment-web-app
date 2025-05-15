import { SimilarCard, SimilarCardProps } from '@/components/Shared/SimilarCard'
import {
  CaretLeftIcon,
  CaretRightIcon,
  SimilarContainer,
  SimilarContent,
} from './styles'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useRef } from 'react'
import { TV_MEDIA } from '@/utils/constants'

interface Props {
  tvSeries?: SimilarCardProps[] | [] | undefined
  handleClickMedia: (mediaType: string, id: string) => void
}

export function TvSection({ tvSeries, handleClickMedia }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  function handleScrollRight() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  function handleScrollLeft() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  return (
    tvSeries &&
    tvSeries?.length > 0 && (
      <SimilarContainer>
        <h2>TV Series Credits</h2>
        <SimilarContent ref={scrollContainerRef}>
          <CaretLeftIcon onClick={handleScrollLeft}>
            <CaretLeft />
          </CaretLeftIcon>
          {tvSeries &&
            tvSeries.map((item) => {
              return (
                <SimilarCard
                  handleClick={() => handleClickMedia(TV_MEDIA, item.id)}
                  id={item.id}
                  key={item.id}
                  release_date={item?.release_date || item?.first_air_date}
                  title={item?.title || item?.name}
                  backdrop_path={item?.backdrop_path}
                  media_type={TV_MEDIA}
                />
              )
            })}
          <CaretRightIcon onClick={handleScrollRight}>
            <CaretRight />
          </CaretRightIcon>
        </SimilarContent>
      </SimilarContainer>
    )
  )
}
