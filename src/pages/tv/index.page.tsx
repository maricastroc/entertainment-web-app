import { genreTV, getGenre } from '@/lib/tmdb'
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

export default function TvGenres({ data }: TvGenreProps) {
  return <GenreCollection data={data} media="tv" />
}

export async function getStaticProps() {
  const url = getGenre(genreTV)
  const response = await fetch(url)
  const data = await response.json()

  return {
    props: {
      data,
    },
  }
}
