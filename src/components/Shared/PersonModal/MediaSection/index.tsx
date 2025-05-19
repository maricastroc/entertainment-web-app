import { SimilarCard, SimilarCardProps } from '@/components/Shared/SimilarCard'

import { CaretLeft, CaretRight } from 'phosphor-react'
import { useRef } from 'react'
import {
  CaretLeftIcon,
  CaretRightIcon,
  Container,
  Content,
  LoadMoreCard,
} from './styles'

interface MediaSectionProps {
  items?: SimilarCardProps[] | [] | undefined
  mediaType: string
  title: string
  hasMore?: boolean
  onLoadMore?: () => void
  handleClickMedia: (mediaType: string, id: string) => void
}

export function MediaSection({
  items,
  mediaType,
  title,
  hasMore = false,
  onLoadMore,
  handleClickMedia,
}: MediaSectionProps) {
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
    items &&
    items?.length > 0 && (
      <Container>
        <h2>{title}</h2>
        <Content ref={scrollContainerRef}>
          <CaretLeftIcon onClick={handleScrollLeft}>
            <CaretLeft />
          </CaretLeftIcon>
          {items &&
            items.map((item) => {
              return (
                <SimilarCard
                  handleClick={() => handleClickMedia(mediaType, item.id)}
                  id={item.id}
                  key={item.id}
                  release_date={item?.release_date || item?.first_air_date}
                  title={item?.title || item?.name}
                  backdrop_path={item?.backdrop_path}
                  media_type={mediaType}
                />
              )
            })}
          {hasMore && onLoadMore && (
            <LoadMoreCard onClick={onLoadMore}>Load More</LoadMoreCard>
          )}
          <CaretRightIcon onClick={handleScrollRight}>
            <CaretRight />
          </CaretRightIcon>
        </Content>
      </Container>
    )
  )
}
