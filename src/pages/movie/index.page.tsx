import { genreMovie, getGenre } from '@/lib/tmdb'
import GenreCollection from '@/components/Shared/GenreCollection'

interface GenreItem {
  name: string
  id: string
}

interface TvGenreProps {
  data: {
    genres: GenreItem[]
  }
}

export default function MovieGenres({ data }: TvGenreProps) {
  return <GenreCollection data={data} media="movie" />
}

export async function getStaticProps() {
  const url = getGenre(genreMovie)
  const response = await fetch(url)
  const data = await response.json()

  return {
    props: {
      data,
    },
  }
}
