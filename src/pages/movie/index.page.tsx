import { genreMovie, getGenre } from '@/lib/tmdb'
import { Container, GenresContainer, Wrapper } from './styles'
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { pathToSearchMovie } from '@/utils'
import { GenreCard } from '@/components/GenreCard'

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
  return (
    <Wrapper>
      <Header />
      <Container>
        <SearchBar
          searchPath={pathToSearchMovie}
          placeholder="Search for Movies"
        />
        <GenresContainer>
          {data.genres.map((item, index) => {
            return (
              <GenreCard
                key={item.id}
                id={item.id}
                name={item.name}
                media_type="movie"
                background={index % 2 === 0 ? 'isEvenMovie' : 'notEven'}
              />
            )
          })}
        </GenresContainer>
      </Container>
    </Wrapper>
  )
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
