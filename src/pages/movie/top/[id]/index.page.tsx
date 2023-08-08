import { Container, MediaContainer, MediaContent, Wrapper } from './styles'
import { SearchBar } from '@/components/SearchBar'
import { Header } from '@/components/Header'
import { pathToSearchMovie } from '@/utils'
import { MediaCard } from '@/components/MediaCard'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import { PaginationTrendingBar } from '@/components/PaginationTrendingBar'
import { NextSeo } from 'next-seo'

interface SearchResultItemProps {
  id: string
  name?: string
  title?: string
  first_air_date?: string
  release_date?: string
  media_type: string
  backdrop_path?: string
  poster_path?: string
  profile_path?: string
}

export default function TopMovies() {
  const router = useRouter()
  const { id } = router.query

  const [data, setData] = useState<SearchResultItemProps[] | undefined>()

  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetch(`/api/movie/top/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results)
        setTotalPages(data.total_pages)
      })
      .catch((error) => {
        console.error('Error getting movie details:', error)
      })
  }, [id])

  return (
    <>
      <NextSeo title="Top Rating Movies | MovieMentor" />
      {data ? (
        <Wrapper>
          <Header />
          <Container>
            <SearchBar
              searchPath={pathToSearchMovie}
              placeholder="Search for movies"
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
                      media_type="movie"
                    />
                  )
                })}
              </MediaContent>
            </MediaContainer>
            <PaginationTrendingBar
              actualPage={parseFloat(id as string)}
              searchPath="movie/top/"
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
