import { SimilarCard, SimilarCardProps } from '@/components/Shared/SimilarCard'
import {
  CaretLeftIcon,
  CaretRightIcon,
  SimilarContainer,
  SimilarContent,
} from './styles'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useRef } from 'react'
import { MOVIE_MEDIA } from '@/utils/constants'

interface Props {
  movies?: SimilarCardProps[] | [] | undefined
  handleClickMedia: (mediaType: string, id: string) => void
}

export function MoviesSection({ movies, handleClickMedia }: Props) {
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
    movies &&
    movies?.length > 0 && (
      <SimilarContainer>
        <h2>Movie Credits</h2>
        <SimilarContent ref={scrollContainerRef}>
          <CaretLeftIcon onClick={handleScrollLeft}>
            <CaretLeft />
          </CaretLeftIcon>
          {movies &&
            movies.map((item) => {
              return (
                <SimilarCard
                  handleClick={() => handleClickMedia(MOVIE_MEDIA, item.id)}
                  id={item.id}
                  key={item.id}
                  release_date={item?.release_date || item?.first_air_date}
                  title={item?.title || item?.name}
                  backdrop_path={item?.backdrop_path}
                  media_type={MOVIE_MEDIA}
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
