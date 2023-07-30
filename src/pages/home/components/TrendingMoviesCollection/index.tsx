import {
  TrendingMovieCard,
  TrendingMovieCardProps,
} from '@/components/TrendingMovieCard'

import { TrendingContainer, TrendingContent } from './styles'

interface TrendingMoviesCollectionProps {
  title: string
  items: TrendingMovieCardProps[]
}

export default function TrendingMoviesCollection({
  title,
  items,
}: TrendingMoviesCollectionProps) {
  return (
    <TrendingContainer>
      <h2>{title}</h2>
      <TrendingContent>
        {items.map((trendingCard: TrendingMovieCardProps) => {
          return (
            <TrendingMovieCard
              key={trendingCard.id}
              id={trendingCard.id}
              title={trendingCard.title}
              release_date={trendingCard.release_date}
              backdrop_path={trendingCard.backdrop_path}
              media_type={trendingCard.media_type}
            />
          )
        })}
      </TrendingContent>
    </TrendingContainer>
  )
}
