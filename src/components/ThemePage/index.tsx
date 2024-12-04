import { Container, MediaContainer, MediaContent, Wrapper } from './styles'
import { SearchBar } from '@/components/SearchBar'
import { Header } from '@/components/Header'
import { pathToSearchMovie, pathToSearchTV } from '@/utils'
import { MediaCard } from '@/components/MediaCard'
import Loading from '@/components/Loading'
import { PaginationTrendingBar } from '@/components/PaginationTrendingBar'
import { SearchResultItemProps } from '@/pages/search/[id]/index.page'
import { NextSeo } from 'next-seo'

interface Props {
  data: SearchResultItemProps[]
  searchPath: string
  totalPages: number
  pageName: string
  media: 'tv' | 'movie'
  id: string
}

export default function ThemePage({
  id,
  data,
  searchPath,
  totalPages,
  pageName,
  media,
}: Props) {
  return (
    <>
      <NextSeo title={pageName} />
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
            <MediaContainer>
              <MediaContent>
                {data.map((item: SearchResultItemProps) => {
                  return (
                    <MediaCard
                      key={item.id}
                      id={item.id}
                      name={item.name || item.title}
                      first_air_date={item.first_air_date || item.release_date}
                      backdrop_path={
                        item.backdrop_path ||
                        item.poster_path ||
                        item.profile_path
                      }
                      media_type="tv"
                    />
                  )
                })}
              </MediaContent>
            </MediaContainer>
            <PaginationTrendingBar
              actualPage={parseFloat(id as string)}
              searchPath={searchPath}
              totalPages={totalPages}
            />
          </Container>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  )
}
