import { MediaCardProps } from '../../index.page'
import { TrendingContainer, TrendingContent } from './styles'
import { TrendingMediaCard } from '@/components/TrendingMediaCard'

interface TrendingMediaCollectionProps {
  title: string
  items: MediaCardProps[]
}

export default function TrendingMediaCollection({
  title,
  items,
}: TrendingMediaCollectionProps) {
  return (
    <TrendingContainer>
      <h2>{title}</h2>
      <TrendingContent>
        {items.map((trendingCard: MediaCardProps) => {
          return (
            <TrendingMediaCard
              key={trendingCard.id}
              id={trendingCard.id}
              name={trendingCard.name || trendingCard.title}
              first_air_date={
                trendingCard.first_air_date || trendingCard.release_date
              }
              backdrop_path={
                trendingCard.backdrop_path || trendingCard.poster_path
              }
              media_type={trendingCard.media_type}
            />
          )
        })}
      </TrendingContent>
    </TrendingContainer>
  )
}
