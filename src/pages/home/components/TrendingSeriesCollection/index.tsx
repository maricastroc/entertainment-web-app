import { TrendingContainer, TrendingContent } from './styles'
import {
  TrendingSeriesCard,
  TrendingSeriesCardProps,
} from '@/components/TrendingSeriesCard'

interface TrendingSeriesCollectionProps {
  title: string
  items: TrendingSeriesCardProps[]
}

export default function TrendingSeriesCollection({
  title,
  items,
}: TrendingSeriesCollectionProps) {
  return (
    <TrendingContainer>
      <h2>{title}</h2>
      <TrendingContent>
        {items.map((trendingCard: TrendingSeriesCardProps) => {
          return (
            <TrendingSeriesCard
              key={trendingCard.id}
              id={trendingCard.id}
              name={trendingCard.name}
              first_air_date={trendingCard.first_air_date}
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
