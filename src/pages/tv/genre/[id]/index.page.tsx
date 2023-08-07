import Loading from '@/components/Loading'
import { discoverTV, getUrl } from '@/lib/tmdb'
import { SearchResultItemProps } from '@/pages/search/[id]/index.page'
import { NextPageContext } from 'next'
import { Container, MediaContainer, MediaContent, Wrapper } from './styles'
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { pathToSearchTV } from '@/utils'
import { MediaCard } from '@/components/MediaCard'
import { PaginationTrendingBar } from '@/components/PaginationTrendingBar'
import { NextSeo } from 'next-seo'

interface GenreIdProps {
  data: {
    results: SearchResultItemProps[]
    total_pages: number
  }
  id: string
  name: string
  page: string
}

export default function GenreId({ data, id, name, page }: GenreIdProps) {
  const currentPage = Number(page)
  console.log(data, id, name, page)
  return (
    <>
      <NextSeo title="Genre TV Series | MovieMentor" />
      {data ? (
        <Wrapper>
          <Header />
          <Container>
            <SearchBar
              searchPath={pathToSearchTV}
              placeholder="Search for TV series"
            />
            <MediaContainer>
              <MediaContent>
                {data.results.map((item: SearchResultItemProps) => {
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
                      media_type={item.media_type}
                    />
                  )
                })}
              </MediaContent>
            </MediaContainer>
            <PaginationTrendingBar
              actualPage={currentPage}
              searchPath={`/tv/genre/${id}?name=${name}&page=`}
              totalPages={data.total_pages}
            />
          </Container>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { id, name, page } = context.query
  const url = getUrl(discoverTV, id as string, name as string, page as string)
  const response = await fetch(url)
  const data = await response.json()

  return {
    props: {
      data,
      id,
      name,
      page,
    },
  }
}
