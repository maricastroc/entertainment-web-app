import { BookmarkCard } from '@/components/Shared/BookmarkCard'
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
import MediaModal from '@/components/Shared/MediaModal'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { useAppContext } from '@/contexts/AppContext'
import { MOVIE_MEDIA, TV_MEDIA } from '@/utils/constants'
import AuthLayout from '@/layouts/auth'
import PersonModal from '@/components/Shared/PersonModal'

export default function Bookmark() {
  const isRouteLoading = useLoadingOnRouteChange()

  const { isLoading } = useAppContext()

  const [isMovieMediaModalOpen, setIsMovieMediaModalOpen] = useState(false)

  const [isSeriesMediaModalOpen, setIsSeriesMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

  const [selectedMediaType, setSelectedMediaType] = useState('')

  const { data, mutate, isValidating } = useRequest<UserProps | null>({
    url: '/profile',
    method: 'GET',
  })

  return (
    <>
      <NextSeo title="Bookmark | MovieMentor" />

      <AuthLayout
        searchPath={pathToSearchAll}
        searchPlaceholder="Search for Movies / TV series"
        isLoading={isRouteLoading || isValidating || isLoading}
      >
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
                        media={MOVIE_MEDIA}
                        mutate={mutate}
                        handleClick={() => {
                          setIsMovieMediaModalOpen(true)
                          setIsSeriesMediaModalOpen(false)
                          setSelectedMediaId(item.id || '')
                        }}
                      />
                    </Dialog.Trigger>
                  )
                })}
                {isMovieMediaModalOpen &&
                  selectedMediaId &&
                  (selectedMediaType === 'person' ? (
                    <PersonModal
                      mediaType={selectedMediaType}
                      id={selectedMediaId}
                      handleClickMedia={(type: string, id: string) => {
                        setSelectedMediaType(type)
                        setSelectedMediaId(id)

                        if (type === TV_MEDIA) {
                          setIsSeriesMediaModalOpen(true)
                          setIsMovieMediaModalOpen(false)
                        }
                      }}
                      onClose={() => {
                        setIsMovieMediaModalOpen(false)
                        setSelectedMediaType('')
                      }}
                    />
                  ) : (
                    <MediaModal
                      media_type={MOVIE_MEDIA}
                      handleClickMedia={(type: string, id: string) => {
                        setSelectedMediaType(type)
                        setSelectedMediaId(id)
                      }}
                      id={selectedMediaId}
                      onClose={() => setIsMovieMediaModalOpen(false)}
                    />
                  ))}
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
                        media={TV_MEDIA}
                        mutate={mutate}
                        handleClick={() => {
                          setIsSeriesMediaModalOpen(true)
                          setIsMovieMediaModalOpen(false)
                          setSelectedMediaId(item.id || '')
                        }}
                      />
                    </Dialog.Trigger>
                  )
                })}
                {isSeriesMediaModalOpen &&
                  selectedMediaId &&
                  (selectedMediaType === 'person' ? (
                    <PersonModal
                      mediaType={selectedMediaType}
                      id={selectedMediaId}
                      handleClickMedia={(type: string, id: string) => {
                        setSelectedMediaType(type)
                        setSelectedMediaId(id)

                        if (type === MOVIE_MEDIA) {
                          setIsSeriesMediaModalOpen(false)
                          setIsMovieMediaModalOpen(true)
                        }
                      }}
                      onClose={() => {
                        setIsSeriesMediaModalOpen(false)
                        setSelectedMediaType('')
                      }}
                    />
                  ) : (
                    <MediaModal
                      media_type={TV_MEDIA}
                      id={selectedMediaId}
                      onClose={() => setIsSeriesMediaModalOpen(false)}
                      handleClickMedia={(type: string, id: string) => {
                        setSelectedMediaType(type)
                        setSelectedMediaId(id)
                      }}
                    />
                  ))}
              </MediaContent>
            </Dialog.Root>
            {!data?.savedSeries?.length && (
              <p>You&apos;ve got no bookmarked series to show.</p>
            )}
          </MediaContainer>
        </MainContent>
      </AuthLayout>
    </>
  )
}
