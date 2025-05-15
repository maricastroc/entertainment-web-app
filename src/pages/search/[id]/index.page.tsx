import { search } from '@/lib/tmdb'
import { SearchBar } from '@/components/Shared/SearchBar'
import { Header } from '@/components/Shared/Header'
import { pathToSearchAll } from '@/utils'
import { MediaCard } from '@/components/Shared/MediaCard'
import { PaginationBar } from '@/components/Shared/PaginationBar'
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
import { useEffect, useState } from 'react'
import MediaModal from '@/components/Shared/MediaModal'
import { LoadingComponent } from '@/components/Core/LoadingComponent'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import PersonModal from '@/components/Shared/PersonModal'
import { SimilarCardProps } from '@/components/Shared/SimilarCard'
import { useAppContext } from '@/contexts/AppContext'

export interface SearchResultItemProps {
  id: string
  name?: string
  title?: string
  first_air_date?: string
  release_date?: string
  media_type: string
  backdrop_path?: string
  poster_path?: string
  known_for?: SimilarCardProps[] | null | undefined
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

  const { isLoading } = useAppContext()

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

  const [selectedMediaType, setSelectedMediaType] = useState('')

  const [knownFor, setKnownFor] = useState<
    SimilarCardProps[] | null | undefined
  >(null)

  useEffect(() => {
    if (selectedMediaType === 'person') {
      const person = data?.results.find((item) => item.id === selectedMediaId)

      setKnownFor(person?.known_for)
    }
  }, [selectedMediaId, selectedMediaType, data?.results])

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
                            setSelectedMediaType(item.media_type)
                          }}
                        />
                      </Dialog.Trigger>
                    )
                  })}
                  {isMediaModalOpen &&
                    selectedMediaId &&
                    (selectedMediaType === 'person' ? (
                      <PersonModal
                        mediaType={selectedMediaType}
                        id={selectedMediaId}
                        knownFor={knownFor}
                        handleClickMedia={(type: string, id: string) => {
                          setSelectedMediaType(type)
                          setSelectedMediaId(id)
                        }}
                        onClose={() => setIsMediaModalOpen(false)}
                      />
                    ) : (
                      <MediaModal
                        media_type={selectedMediaType}
                        id={selectedMediaId}
                        onClose={() => setIsMediaModalOpen(false)}
                      />
                    ))}
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
        {(isRouteLoading || isLoading) && <LoadingComponent hasOverlay />}
      </Wrapper>
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { id, page } = context.query

  const url = search(String(id), String(page))
  const response = await fetch(url)
  const data = await response.json()

  return {
    props: {
      data: {
        total_results: data.total_results,
        total_pages: data.total_pages,
        results: data.results,
      },
      id,
      page,
    },
  }
}
