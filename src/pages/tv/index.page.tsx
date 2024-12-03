import { genreTV, getGenre } from '@/lib/tmdb'
import { Container, GenresContainer, MainContent, Wrapper } from './styles'
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { pathToSearchTV } from '@/utils'
import { GenreCard } from '@/components/GenreCard'
import { NextSeo } from 'next-seo'

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
  console.log(data)
  return (
    <>
      <NextSeo title="TV Series | MovieMentor" />
      <Wrapper>
        <Header />
        <Container>
          <SearchBar
            searchPath={pathToSearchTV}
            placeholder="Search for TV series"
          />
          <MainContent>
            <GenresContainer>
              {data?.genres?.map((item, index) => {
                return (
                  <GenreCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    media_type="tv"
                    background={index % 2 === 0 ? 'isEvenTv' : 'notEven'}
                  />
                )
              })}
            </GenresContainer>
          </MainContent>
        </Container>
      </Wrapper>
    </>
  )
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
