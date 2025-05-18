import {
  MainContent,
  MediaContainer,
  MediaContent,
  MediaHeader,
  MediaTitle,
} from './styles'
import { UserProps } from '@/types/user'
import { pathToSearchAll } from '@/utils'
import useRequest from '@/utils/useRequest'
import { NextSeo } from 'next-seo'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { MOVIE_MEDIA, PERSON_MEDIA, TV_MEDIA } from '@/utils/constants'
import AuthLayout from '@/layouts/auth'
import 'react-loading-skeleton/dist/skeleton.css'
import { BookmarkSkeleton } from './partials/BookmarkSkeleton'
import { ModalSection } from '@/components/Shared/ModalSection'
import { BookmarkCard } from './partials/BookmarkCard'

export default function Bookmark() {
  const isRouteLoading = useLoadingOnRouteChange()

  const [isMovieMediaModalOpen, setIsMovieMediaModalOpen] = useState(false)

  const [isSeriesMediaModalOpen, setIsSeriesMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

  const [selectedMediaType, setSelectedMediaType] = useState('')

  const { data, mutate, isValidating } = useRequest<UserProps | null>({
    url: '/profile',
    method: 'GET',
  })
  console.log(data)
  return (
    <>
      <NextSeo title="Bookmark | MovieMentor" />
      <AuthLayout
        searchPath={pathToSearchAll}
        searchPlaceholder="Search for Movies / Series"
        isLoading={isRouteLoading || isValidating}
      >
        <MainContent>
          <MediaContainer>
            <MediaHeader>
              <MediaTitle>
                <h2>Bookmarked Movies</h2>
              </MediaTitle>
            </MediaHeader>
            <MediaContent>
              {isValidating ? (
                <BookmarkSkeleton />
              ) : data?.savedMovies?.length ? (
                <Dialog.Root open={isMovieMediaModalOpen}>
                  {data.savedMovies.map((item) => (
                    <Dialog.Trigger asChild key={item.id}>
                      <BookmarkCard
                        id={item.id}
                        media={MOVIE_MEDIA}
                        mutate={mutate}
                        handleClick={() => {
                          setIsMovieMediaModalOpen(true)
                          setIsSeriesMediaModalOpen(false)
                          setSelectedMediaId(item.id || '')
                        }}
                      />
                    </Dialog.Trigger>
                  ))}
                </Dialog.Root>
              ) : (
                <p>You&apos;ve got no bookmarked movies to show.</p>
              )}
            </MediaContent>
          </MediaContainer>

          <MediaContainer>
            <MediaHeader>
              <MediaTitle>
                <h2>Bookmarked Series</h2>
              </MediaTitle>
            </MediaHeader>
            <MediaContent>
              {isValidating ? (
                <BookmarkSkeleton />
              ) : data?.savedSeries?.length ? (
                <Dialog.Root open={isSeriesMediaModalOpen}>
                  {data.savedSeries.map((item) => (
                    <Dialog.Trigger asChild key={item.id}>
                      <BookmarkCard
                        id={item.id}
                        media={TV_MEDIA}
                        mutate={mutate}
                        handleClick={() => {
                          setIsMovieMediaModalOpen(false)
                          setIsSeriesMediaModalOpen(true)
                          setSelectedMediaId(item.id || '')
                        }}
                      />
                    </Dialog.Trigger>
                  ))}
                </Dialog.Root>
              ) : (
                <p>You&apos;ve got no bookmarked series to show.</p>
              )}
            </MediaContent>
          </MediaContainer>
        </MainContent>

        <ModalSection
          openPersonModal={selectedMediaType === PERSON_MEDIA}
          isOpen={isMovieMediaModalOpen}
          mediaType={MOVIE_MEDIA}
          selectedId={selectedMediaId}
          onClose={() => {
            setIsMovieMediaModalOpen(false)

            if (selectedMediaType === PERSON_MEDIA) {
              setSelectedMediaType(MOVIE_MEDIA)
            }
          }}
          onChangeMedia={(type, id) => {
            setSelectedMediaType(type)
            setSelectedMediaId(id)

            if (type === TV_MEDIA) {
              setIsSeriesMediaModalOpen(true)
              setIsMovieMediaModalOpen(false)
            }
          }}
        />

        <ModalSection
          openPersonModal={selectedMediaType === PERSON_MEDIA}
          isOpen={isSeriesMediaModalOpen}
          mediaType={TV_MEDIA}
          selectedId={selectedMediaId}
          onClose={() => {
            setIsSeriesMediaModalOpen(false)

            if (selectedMediaType === PERSON_MEDIA) {
              setSelectedMediaType(TV_MEDIA)
            }
          }}
          onChangeMedia={(type, id) => {
            setSelectedMediaType(type)
            setSelectedMediaId(id)

            if (type === MOVIE_MEDIA) {
              setIsSeriesMediaModalOpen(false)
              setIsMovieMediaModalOpen(true)
            }
          }}
        />
      </AuthLayout>
    </>
  )
}
