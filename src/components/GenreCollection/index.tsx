import {
  Container,
  MainContent,
  MovieGenresContainer,
  TvGenresContainer,
  Wrapper,
} from './styles'
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { pathToSearchMovie, pathToSearchTV } from '@/utils'
import { GenreCard } from '@/components/GenreCard'
import { NextSeo } from 'next-seo'

interface GenreItem {
  name: string
  id: string
}

interface GenreCollectionProps {
  data: {
    genres: GenreItem[]
  }
  media: 'tv' | 'movie'
}

export default function GenreCollection({ data, media }: GenreCollectionProps) {
  return (
    <>
      <NextSeo
        title={
          media === 'tv'
            ? 'Genre TV Series | MovieMentor'
            : 'Genre Movies | MovieMentor'
        }
      />
      <Wrapper>
        <Header />
        <Container>
          <SearchBar
            searchPath={media === 'tv' ? pathToSearchTV : pathToSearchMovie}
            placeholder={
              media === 'tv' ? 'Search for TV series' : 'Search for Movies'
            }
          />
          <MainContent>
            {media === 'tv' ? (
              <TvGenresContainer>
                {data?.genres?.map((item, index) => {
                  return (
                    <GenreCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      media_type={media}
                      background={index % 2 === 0 ? 'isEvenTv' : 'notEven'}
                    />
                  )
                })}
              </TvGenresContainer>
            ) : (
              <MovieGenresContainer>
                {data?.genres?.map((item, index) => {
                  return (
                    <GenreCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      media_type={media}
                      background={
                        index % 2 === 0
                          ? `${media === 'movie' ? 'isEvenMovie' : 'isEvenTv'}`
                          : 'notEven'
                      }
                    />
                  )
                })}
              </MovieGenresContainer>
            )}
          </MainContent>
        </Container>
      </Wrapper>
    </>
  )
}
