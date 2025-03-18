import { searchMovie } from '@/lib/tmdb'
import {
  Container,
  MainContent,
  MediaContainer,
  MediaContent,
  Wrapper,
} from '@/styles/shared'
import { SearchBar } from '@/components/Shared/SearchBar'
import { Header } from '@/components/Shared/Header'
import { pathToSearchMovie } from '@/utils'
import { MediaCard } from '@/components/Shared/MediaCard'
import { PaginationBar } from '@/components/Shared/PaginationBar'
import { NextPageContext } from 'next'
import { NextSeo } from 'next-seo'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import MediaModal from '@/components/Shared/MediaModal'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { LoadingComponent } from '@/components/Core/LoadingComponent'

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

export default function SearchMovie({ data, id, page }: SearchProps) {
  const isRouteLoading = useLoadingOnRouteChange()

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

  return (
    <>
      <NextSeo title="Search Movie | MovieMentor" />
      <Wrapper>
        <Header />
        <Container>
          <SearchBar
            searchPath={pathToSearchMovie}
            placeholder="Search for Movies"
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
                          media_type={'movie'}
                          handleClick={() => {
                            setIsMediaModalOpen(true)
                            setSelectedMediaId(item.id || '')
                          }}
                        />
                      </Dialog.Trigger>
                    )
                  })}
                  {isMediaModalOpen && selectedMediaId && (
                    <MediaModal
                      media_type={'movie'}
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
              searchPath={pathToSearchMovie}
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
  const url = searchMovie(String(id), String(page))
  const response = await fetch(url)
  const data = await response.json()

  return {
    props: {
      data,
      id,
      page,
    },
  }
}
