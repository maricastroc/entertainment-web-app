import { MediaCard } from '@/components/MediaCard'
import { MediaCardProps } from '../../index.page'
import {
  SeriesContainer,
  SeriesContent,
  SeriesHeader,
  SeriesTag,
  SeriesTitle,
} from './styles'

interface MediaListProps {
  title: string
  items: MediaCardProps[]
  media: string
}

export default function MediaList({ title, items, media }: MediaListProps) {
  return (
    <SeriesContainer>
      <SeriesHeader>
        <SeriesTitle>
          <h2>{title}</h2>
          <SeriesTag>
            <p>{media}</p>
          </SeriesTag>
        </SeriesTitle>
        <button>See More</button>
      </SeriesHeader>
      <SeriesContent>
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
      </SeriesContent>
    </SeriesContainer>
  )
}
