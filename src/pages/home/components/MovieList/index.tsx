import { MovieCard, MovieCardProps } from '@/components/MovieCard'
import {
  MovieContainer,
  MovieContent,
  MovieHeader,
  MovieTag,
  MovieTitle,
} from './styles'

interface MovieListProps {
  title: string
  items: MovieCardProps[]
  media: string
}

export default function MovieList({ title, items, media }: MovieListProps) {
  return (
    <MovieContainer>
      <MovieHeader>
        <MovieTitle>
          <h2>{title}</h2>
          <MovieTag>
            <p>{media}</p>
          </MovieTag>
        </MovieTitle>
        <button>See More</button>
      </MovieHeader>
      <MovieContent>
        {items.map((item) => (
          <MovieCard
            key={item.id}
            id={item.id}
            title={item.title}
            release_date={item.release_date}
            backdrop_path={item.backdrop_path}
            media_type={media}
          />
        ))}
      </MovieContent>
    </MovieContainer>
  )
}
