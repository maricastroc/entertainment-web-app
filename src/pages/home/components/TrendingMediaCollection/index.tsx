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
import { ScrollableContainer } from '../../styles'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import MediaModal from '@/components/MediaModal'

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

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

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
      <ScrollableContainer>
        <TrendingContent>
          <Dialog.Root open={isMediaModalOpen}>
            {items.map((trendingCard: MediaCardProps) => {
              return (
                <Dialog.Trigger asChild key={trendingCard.id}>
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
                    handleClick={() => {
                      setIsMediaModalOpen(true)
                      setSelectedMediaId(trendingCard.id || '')
                    }}
                  />
                </Dialog.Trigger>
              )
            })}
            {isMediaModalOpen && selectedMediaId && (
              <MediaModal
                media_type={media_type}
                id={selectedMediaId}
                onClose={() => setIsMediaModalOpen(false)}
              />
            )}
          </Dialog.Root>
        </TrendingContent>
      </ScrollableContainer>
    </TrendingContainer>
  )
}
