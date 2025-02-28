import { MediaCard } from '@/components/MediaCard'
import { MediaCardProps } from '../../index.page'
import {
  MediaContainer,
  MediaContent,
  MediaHeader,
  MediaTag,
  MediaTitle,
} from './styles'
import { useRouter } from 'next/router'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import MediaModal from '@/components/MediaModal'

interface MediaListProps {
  title: string
  items: MediaCardProps[]
  media: string
  endpoint: string
}

export default function MediaList({
  title,
  items,
  media,
  endpoint,
}: MediaListProps) {
  const router = useRouter()

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

  async function handleGoToTrendingMedia() {
    const basePath = router.basePath
    const moviePath = `${basePath}/movie/${endpoint}`
    const seriesPath = `${basePath}/tv/${endpoint}`

    media.toLowerCase() === 'movie'
      ? await router.push(`${moviePath}/1`)
      : await router.push(`${seriesPath}/1`)
  }

  return (
    <MediaContainer>
      <MediaHeader>
        <MediaTitle>
          <h2>{title}</h2>
          <MediaTag>
            <p>{media}</p>
          </MediaTag>
        </MediaTitle>
        <button onClick={handleGoToTrendingMedia}>See More</button>
      </MediaHeader>
      <MediaContent>
        <Dialog.Root open={isMediaModalOpen}>
          {items.map((item) => (
            <Dialog.Trigger asChild key={item.id}>
              <MediaCard
                id={item.id}
                name={item.name || item.title}
                first_air_date={item.first_air_date || item.release_date}
                backdrop_path={item.backdrop_path || item.poster_path}
                media_type={media.toLowerCase()}
                handleClick={() => {
                  setIsMediaModalOpen(true)
                  setSelectedMediaId(item.id || '')
                }}
              />
            </Dialog.Trigger>
          ))}
          {isMediaModalOpen && selectedMediaId && (
            <MediaModal
              media_type={media.toLowerCase()}
              id={selectedMediaId}
              onClose={() => setIsMediaModalOpen(false)}
            />
          )}
        </Dialog.Root>
      </MediaContent>
    </MediaContainer>
  )
}
