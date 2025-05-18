import { MediaCard } from '@/components/Shared/MediaCard'
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
import { MOVIE_MEDIA, PERSON_MEDIA, TV_MEDIA } from '@/utils/constants'
import { ModalSection } from '@/components/Shared/ModalSection'

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

  const [selectedMediaType, setSelectedMediaType] = useState(media)

  async function handleGoToTrendingMedia() {
    const basePath = router.basePath

    switch (media.toLowerCase()) {
      case MOVIE_MEDIA:
        await router.push(`${basePath}/movie/${endpoint}/1`)
        break
      case TV_MEDIA:
        await router.push(`${basePath}/tv/${endpoint}/1`)
        break
      case PERSON_MEDIA:
        await router.push(`${basePath}/person/${endpoint}/1`)
        break
      default:
        await router.push(`${basePath}/movie/${endpoint}/1`)
    }
  }
  type MediaType = typeof TV_MEDIA | typeof MOVIE_MEDIA | typeof PERSON_MEDIA

  const mediaLabels: Record<MediaType, string> = {
    [TV_MEDIA]: 'Series',
    [MOVIE_MEDIA]: 'Movie',
    [PERSON_MEDIA]: 'Person',
  }

  return (
    <MediaContainer>
      <MediaHeader>
        <MediaTitle>
          <h2>{title}</h2>
          <MediaTag>
            <p>{mediaLabels[media as MediaType]}</p>
          </MediaTag>
        </MediaTitle>
        <button onClick={handleGoToTrendingMedia}>See More</button>
      </MediaHeader>
      <MediaContent hasCustomGrid={media !== PERSON_MEDIA}>
        <Dialog.Root open={isMediaModalOpen}>
          {items.map((item) => (
            <Dialog.Trigger asChild key={item.id}>
              <MediaCard
                id={item.id}
                name={item.name || item.title}
                first_air_date={item.first_air_date || item.release_date}
                backdrop_path={
                  item?.backdrop_path || item?.poster_path || item?.profile_path
                }
                media_type={media.toLowerCase()}
                handleClick={() => {
                  setIsMediaModalOpen(true)
                  setSelectedMediaId(item.id || '')
                }}
              />
            </Dialog.Trigger>
          ))}

          <ModalSection
            openPersonModal={selectedMediaType === PERSON_MEDIA}
            isOpen={isMediaModalOpen}
            mediaType={selectedMediaType}
            selectedId={selectedMediaId}
            onClose={() => {
              setIsMediaModalOpen(false)
              setSelectedMediaType(media)
            }}
            onChangeMedia={(type: string, id: string) => {
              setSelectedMediaType(type)
              setSelectedMediaId(id)
            }}
          />
        </Dialog.Root>
      </MediaContent>
    </MediaContainer>
  )
}
