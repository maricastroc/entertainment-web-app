import {
  Container,
  MainContent,
  MediaContainer,
  MediaContent,
  Wrapper,
} from './styles'
import { SearchBar } from '@/components/Shared/SearchBar'
import { Header } from '@/components/Shared/Header'
import { pathToSearchMovie, pathToSearchTV } from '@/utils'
import { MediaCard } from '@/components/Shared/MediaCard'
import Loading from '@/components/Core/Loading'
import { PaginationTrendingBar } from '@/components/Shared/PaginationTrendingBar'
import { SearchResultItemProps } from '@/pages/search/[id]/index.page'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import MediaModal from '@/components/Shared/MediaModal'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { LoadingComponent } from '@/components/Core/LoadingComponent'

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
  const isRouteLoading = useLoadingOnRouteChange()

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

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
            <MainContent>
              <MediaContainer>
                <MediaContent>
                  <Dialog.Root open={isMediaModalOpen}>
                    {data.map((item: SearchResultItemProps) => {
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
                              setSelectedMediaId(item.id)
                            }}
                          />
                        </Dialog.Trigger>
                      )
                    })}
                    {isMediaModalOpen && (
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
                actualPage={parseFloat(id as string)}
                searchPath={searchPath}
                totalPages={totalPages}
              />
            </MainContent>
          </Container>
          {isRouteLoading && <LoadingComponent hasOverlay />}
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  )
}
