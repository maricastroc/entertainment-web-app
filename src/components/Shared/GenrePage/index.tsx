import { NextSeo } from 'next-seo'
import { MainContent, MediaContainer, MediaContent } from './styles'
import { MediaCard } from '@/components/Shared/MediaCard'
import { SearchResultItemProps } from '@/pages/search/[id]/index.page'
import { pathToSearchMovie, pathToSearchTV } from '@/utils'
import { PaginationTrendingBar } from '@/components/Shared/PaginationTrendingBar'
import Loading from '@/components/Core/Loading'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import MediaModal from '@/components/Shared/MediaModal'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { SignUpModal } from '../SignUpModal'
import { useAppContext } from '@/contexts/AppContext'
import { TV_MEDIA } from '@/utils/constants'
import AuthLayout from '@/layouts/auth'

interface GenrePageProps {
  data: {
    results: SearchResultItemProps[]
    total_pages: number
  }
  id: string
  name: string
  currentPage: number
  media: string
}

export default function GenrePage({
  data,
  id,
  name,
  media,
  currentPage,
}: GenrePageProps) {
  const isRouteLoading = useLoadingOnRouteChange()

  const { isSignUpModalOpen, isLoading } = useAppContext()

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

  return (
    <>
      <NextSeo
        title={
          media === TV_MEDIA
            ? 'Genre TV Series | MovieMentor'
            : 'Genre Movies | MovieMentor'
        }
      />
      {data ? (
        <AuthLayout
          searchPath={media === TV_MEDIA ? pathToSearchTV : pathToSearchMovie}
          isLoading={isRouteLoading || isLoading}
          searchPlaceholder={
            media === TV_MEDIA ? 'Search for TV series' : 'Search for Movies'
          }
        >
          <MainContent>
            <MediaContainer>
              <MediaContent>
                <Dialog.Root open={isSignUpModalOpen}>
                  <SignUpModal />
                </Dialog.Root>
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
        </AuthLayout>
      ) : (
        <Loading />
      )}
    </>
  )
}
