import { SimilarCard, SimilarCardProps } from '@/components/Shared/SimilarCard'
import {
  CaretLeftIcon,
  CaretRightIcon,
  SimilarContainer,
  SimilarContent,
} from './styles'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useRef } from 'react'

interface Props {
  media: string
  similarMedias: SimilarCardProps[] | [] | undefined
  handleClick: (id: string) => void
}

export function SimilarSection({ similarMedias, media, handleClick }: Props) {
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
    <SimilarContainer>
      <h2>You may also like</h2>
      <SimilarContent ref={scrollContainerRef}>
        <CaretLeftIcon onClick={handleScrollLeft}>
          <CaretLeft />
        </CaretLeftIcon>
        {similarMedias &&
          similarMedias.map((item) => {
            return (
              <SimilarCard
                handleClick={() => handleClick(item.id)}
                id={item.id}
                key={item.id}
                release_date={item?.release_date || item?.first_air_date}
                title={item?.title || item?.name}
                backdrop_path={item?.backdrop_path}
                media_type={media}
              />
            )
          })}
        <CaretRightIcon onClick={handleScrollRight}>
          <CaretRight />
        </CaretRightIcon>
      </SimilarContent>
    </SimilarContainer>
  )
}
