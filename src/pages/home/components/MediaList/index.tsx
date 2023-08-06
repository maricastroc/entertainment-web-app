import { MediaCard } from '@/components/MediaCard'
import { MediaCardProps } from '../../index.page'
import {
  MediaContainer,
  MediaContent,
  MediaHeader,
  MediaTag,
  MediaTitle,
} from './styles'

interface MediaListProps {
  title: string
  items: MediaCardProps[]
  media: string
}

export default function MediaList({ title, items, media }: MediaListProps) {
  return (
    <MediaContainer>
      <MediaHeader>
        <MediaTitle>
          <h2>{title}</h2>
          <MediaTag>
            <p>{media}</p>
          </MediaTag>
        </MediaTitle>
        <button>See More</button>
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
