import {
  SeriesContainer,
  SeriesContent,
  SeriesHeader,
  SeriesTag,
  SeriesTitle,
} from './styles'
import { SeriesCard, SeriesCardProps } from '@/components/SeriesCard'

interface SeriesListProps {
  title: string
  items: SeriesCardProps[]
  media: string
}

export default function SeriesList({ title, items, media }: SeriesListProps) {
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
          <SeriesCard
            key={item.id}
            id={item.id}
            name={item.name}
            first_air_date={item.first_air_date}
            backdrop_path={item.backdrop_path || item.poster_path}
            media_type={media}
          />
        ))}
      </SeriesContent>
    </SeriesContainer>
  )
}
