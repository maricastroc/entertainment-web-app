import { NextSeo } from 'next-seo'
import { Header } from '../Header'
import { SearchBar } from '../SearchBar'
import {
  Container,
  MainContent,
  MediaContainer,
  MediaContent,
  Wrapper,
} from './styles'
import { MediaCard } from '../MediaCard'
import { SearchResultItemProps } from '@/pages/search/[id]/index.page'
import { pathToSearchMovie, pathToSearchTV } from '@/utils'
import { PaginationTrendingBar } from '../PaginationTrendingBar'
import Loading from '../Loading'

interface GenrePageProps {
  data: {
    results: SearchResultItemProps[]
    total_pages: number
  }
  id: string
  name: string
  currentPage: number
  media: 'tv' | 'movie'
}

export default function GenrePage({
  data,
  id,
  name,
  media,
  currentPage,
}: GenrePageProps) {
  return (
    <>
      <NextSeo
        title={
          media === 'tv'
            ? 'Genre TV Series | MovieMentor'
            : 'Genre Movies | MovieMentor'
        }
      />
      {data ? (
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
              <MediaContainer>
                <MediaContent>
                  {data.results.map((item: SearchResultItemProps) => {
                    return (
                      <MediaCard
                        key={item.id}
                        id={item.id}
                        name={item.name || item.title}
                        first_air_date={
                          item.first_air_date || item.release_date
                        }
                        backdrop_path={
                          item.backdrop_path ||
                          item.poster_path ||
                          item.profile_path
                        }
                        media_type={media}
                      />
                    )
                  })}
                </MediaContent>
              </MediaContainer>
              <PaginationTrendingBar
                actualPage={currentPage}
                searchPath={`/${media}/genre/${id}?name=${name}&page=`}
                totalPages={data.total_pages}
              />
            </MainContent>
          </Container>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  )
}
