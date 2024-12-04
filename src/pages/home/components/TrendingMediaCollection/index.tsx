import { useRouter } from 'next/router'
import { MediaCardProps } from '../../index.page'
import {
  MediaHeader,
  MediaTag,
  MediaTitle,
  TrendingContainer,
  TrendingContent,
} from './styles'
import { TrendingMediaCard } from '@/components/TrendingMediaCard'

interface TrendingMediaCollectionProps {
  title: string
  media_type: string
  items: MediaCardProps[]
  withTopMargin?: boolean
}

export default function TrendingMediaCollection({
  title,
  items,
  media_type,
  withTopMargin = false,
}: TrendingMediaCollectionProps) {
  const router = useRouter()

  async function handleGoToTrendingMedia() {
    const basePath = router.basePath
    const moviePath = `${basePath}/movie/trending`
    const seriesPath = `${basePath}/tv/trending`

    media_type.toLowerCase() === 'movie'
      ? await router.push(`${moviePath}/1`)
      : await router.push(`${seriesPath}/1`)
  }

  return (
    <TrendingContainer className={withTopMargin ? 'with_top_margin' : ''}>
      <MediaHeader>
        <MediaTitle>
          <h2>{title}</h2>
          <MediaTag>
            <p>{media_type}</p>
          </MediaTag>
        </MediaTitle>
        <button onClick={handleGoToTrendingMedia}>See More</button>
      </MediaHeader>
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
