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

interface MediaListProps {
  title: string
  items: MediaCardProps[]
  media: string
}

export default function MediaList({ title, items, media }: MediaListProps) {
  const router = useRouter()

  async function handleGoToTrendingMedia() {
    const basePath = router.basePath
    const moviePath = `${basePath}/movie/trending`
    const seriesPath = `${basePath}/tv/trending`

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
        {items.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            name={item.name || item.title}
            first_air_date={item.first_air_date || item.release_date}
            backdrop_path={item.backdrop_path || item.poster_path}
            media_type={media}
          />
        ))}
      </MediaContent>
    </MediaContainer>
  )
}
