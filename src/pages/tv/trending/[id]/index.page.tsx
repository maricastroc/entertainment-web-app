import { Container, MediaContainer, MediaContent, Wrapper } from './styles'
import { SearchBar } from '@/components/SearchBar'
import { Header } from '@/components/Header'
import { pathToSearchTV } from '@/utils'
import { MediaCard } from '@/components/MediaCard'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import { PaginationTrendingBar } from '@/components/PaginationTrendingBar'

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

export default function TrendingTv() {
  const router = useRouter()
  const { id } = router.query

  const [trendingData, setTrendingData] = useState<
    SearchResultItemProps[] | undefined
  >()

  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetch(`/api/tv/trending/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTrendingData(data.results)
        setTotalPages(data.total_pages)
      })
      .catch((error) => {
        console.error('Erro ao obter detalhes do filme:', error)
      })
  }, [id])

  console.log(id)

  return (
    <>
      {trendingData ? (
        <Wrapper>
          <Header />
          <Container>
            <SearchBar
              searchPath={pathToSearchTV}
              placeholder="Search for TV series"
            />
            <MediaContainer>
              <MediaContent>
                {trendingData.map((item: SearchResultItemProps) => {
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
              actualPage={parseFloat(id as string)}
              searchPath="tv/trending/"
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
