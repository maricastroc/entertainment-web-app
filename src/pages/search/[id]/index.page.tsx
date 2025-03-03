import { search } from '@/lib/tmdb'
import { SearchBar } from '@/components/SearchBar'
import { Header } from '@/components/Header'
import { pathToSearchAll } from '@/utils'
import { MediaCard } from '@/components/MediaCard'
import { PaginationBar } from '@/components/PaginationBar'
import { NextPageContext } from 'next'
import { NextSeo } from 'next-seo'
import {
  Container,
  MainContent,
  MediaContainer,
  MediaContent,
  Wrapper,
} from '@/styles/shared'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import MediaModal from '@/components/MediaModal'
import { LoadingComponent } from '@/components/LoadingComponent'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'

export interface SearchResultItemProps {
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

interface SearchResult {
  total_results: number
  total_pages: number
  results: SearchResultItemProps[]
}

interface SearchProps {
  data: SearchResult
  id: string
  page: string
}

export default function Search({ data, id, page }: SearchProps) {
  const isRouteLoading = useLoadingOnRouteChange()

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

  const [selectedMediaType, setSelectedMediaType] = useState('')

  return (
    <>
      <NextSeo title="Search | MovieMentor" />
      <Wrapper>
        <Header />
        <Container>
          <SearchBar
            searchPath={pathToSearchAll}
            placeholder="Search for Movies / TV series"
          />
          <MainContent>
            <MediaContainer>
              <h2>{`Found ${data.total_results} results for "${id}"`}</h2>
              <MediaContent>
                <Dialog.Root>
                  {data.results.map((item: SearchResultItemProps) => {
                    return (
                      <Dialog.Trigger asChild key={item.id}>
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
                          media_type={item.media_type}
                          handleClick={() => {
                            setIsMediaModalOpen(true)
                            setSelectedMediaId(item.id || '')
                            setSelectedMediaType(
                              item.media_type === 'movie' ? 'movie' : 'tv',
                            )
                          }}
                        />
                      </Dialog.Trigger>
                    )
                  })}
                  {isMediaModalOpen && selectedMediaId && (
                    <MediaModal
                      media_type={selectedMediaType}
                      id={selectedMediaId}
                      onClose={() => setIsMediaModalOpen(false)}
                    />
                  )}
                </Dialog.Root>
              </MediaContent>
            </MediaContainer>
            <PaginationBar
              id={id}
              actualPage={parseFloat(page)}
              searchPath={pathToSearchAll}
              totalPages={data.total_pages}
            />
          </MainContent>
        </Container>
        {isRouteLoading && <LoadingComponent hasOverlay />}
      </Wrapper>
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { id, page } = context.query
  let currentPage = Number(page) || 1
  let results: SearchResultItemProps[] = []
  let totalResults = 0

  while (results.length < 20) {
    const url = search(String(id), String(currentPage))
    const response = await fetch(url)
    const data = await response.json()

    const filteredResults = data.results.filter(
      (item: SearchResultItemProps) => item.media_type !== 'person',
    )

    results = [...results, ...filteredResults]

    if (currentPage === 1) {
      totalResults = filteredResults.length
    } else {
      totalResults += filteredResults.length
    }

    // Se não houver mais páginas, saia do loop
    if (currentPage >= data.total_pages) break

    currentPage++
  }

  const totalPages = Math.ceil(totalResults / 20) // Recalculando corretamente o total de páginas

  return {
    props: {
      data: {
        total_results: totalResults,
        total_pages: totalPages,
        results,
      },
      id,
      page,
    },
  }
}
