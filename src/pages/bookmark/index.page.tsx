import { BookmarkCard } from '@/components/Shared/BookmarkCard'
import {
  Container,
  MainContent,
  MediaContainer,
  MediaContent,
  MediaHeader,
  MediaTitle,
  Wrapper,
} from './styles'

import { Header } from '@/components/Shared/Header'
import { SearchBar } from '@/components/Shared/SearchBar'
import { UserProps } from '@/types/user'
import { pathToSearchAll } from '@/utils'
import useRequest from '@/utils/useRequest'
import { NextSeo } from 'next-seo'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import MediaModal from '@/components/Shared/MediaModal'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { LoadingComponent } from '@/components/Core/LoadingComponent'

export default function Bookmark() {
  const isRouteLoading = useLoadingOnRouteChange()

  const [isMovieMediaModalOpen, setIsMovieMediaModalOpen] = useState(false)

  const [isSeriesMediaModalOpen, setIsSeriesMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

  const { data, isValidating } = useRequest<UserProps | null>({
    url: '/profile',
    method: 'GET',
  })

  return (
    <>
      <NextSeo title="Bookmark | MovieMentor" />
      <Wrapper>
        <Header />
        <Container>
          <SearchBar
            searchPath={pathToSearchAll}
            placeholder="Search for movie / TV series"
          />
          <MainContent>
            <MediaContainer>
              <MediaHeader>
                <MediaTitle>
                  <h2>Bookmarked Movies</h2>
                </MediaTitle>
              </MediaHeader>
              <MediaContent>
                <Dialog.Root open={isMovieMediaModalOpen}>
                  {data?.savedMovies?.map((item) => {
                    return (
                      <Dialog.Trigger asChild key={item.id}>
                        <BookmarkCard
                          id={item.id}
                          media={'movie'}
                          handleClick={() => {
                            setIsMovieMediaModalOpen(true)
                            setIsSeriesMediaModalOpen(false)
                            setSelectedMediaId(item.id || '')
                          }}
                        />
                      </Dialog.Trigger>
                    )
                  })}
                  {isMovieMediaModalOpen && selectedMediaId && (
                    <MediaModal
                      media_type={'movie'}
                      id={selectedMediaId}
                      onClose={() => setIsMovieMediaModalOpen(false)}
                    />
                  )}
                </Dialog.Root>
              </MediaContent>
              {!data?.savedMovies?.length && (
                <p>You&apos;ve got no bookmarked movies to show.</p>
              )}
            </MediaContainer>
            <MediaContainer>
              <MediaHeader>
                <MediaTitle>
                  <h2>Bookmarked TV Series</h2>
                </MediaTitle>
              </MediaHeader>
              <Dialog.Root open={isSeriesMediaModalOpen}>
                <MediaContent>
                  {data?.savedSeries?.map((item) => {
                    return (
                      <Dialog.Trigger asChild key={item.id}>
                        <BookmarkCard
                          id={item.id}
                          media={'tv'}
                          handleClick={() => {
                            setIsSeriesMediaModalOpen(true)
                            setIsMovieMediaModalOpen(false)
                            setSelectedMediaId(item.id || '')
                          }}
                        />
                      </Dialog.Trigger>
                    )
                  })}
                  {isSeriesMediaModalOpen && selectedMediaId && (
                    <MediaModal
                      media_type={'tv'}
                      id={selectedMediaId}
                      onClose={() => setIsSeriesMediaModalOpen(false)}
                    />
                  )}
                </MediaContent>
              </Dialog.Root>
              {!data?.savedSeries?.length && (
                <p>You&apos;ve got no bookmarked series to show.</p>
              )}
            </MediaContainer>
          </MainContent>
        </Container>
        {(isRouteLoading || isValidating) && <LoadingComponent hasOverlay />}
      </Wrapper>
    </>
  )
}
