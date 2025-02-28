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
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import MediaModal from '@/components/MediaModal'

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
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

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
                            media_type={media}
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
                        media_type={media}
                        id={selectedMediaId}
                        onClose={() => setIsMediaModalOpen(false)}
                      />
                    )}
                  </Dialog.Root>
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
