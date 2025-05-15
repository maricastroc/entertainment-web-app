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
  knownFor: SimilarCardProps[] | [] | undefined
  handleClickMedia: (mediaType: string, id: string) => void
}

export function KnownForSection({ knownFor, handleClickMedia }: Props) {
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
      <h2>Known for...</h2>
      <SimilarContent ref={scrollContainerRef}>
        <CaretLeftIcon onClick={handleScrollLeft}>
          <CaretLeft />
        </CaretLeftIcon>
        {knownFor &&
          knownFor.map((item) => {
            return (
              <SimilarCard
                handleClick={() => handleClickMedia(item.media_type, item.id)}
                id={item.id}
                key={item.id}
                release_date={item?.release_date || item?.first_air_date}
                title={item?.title || item?.name}
                backdrop_path={item?.backdrop_path}
                media_type={item?.media_type}
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
