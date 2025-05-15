import { MainContent, MediaContainer, MediaContent } from './styles'
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
import { SignUpModal } from '../SignUpModal'
import { useAppContext } from '@/contexts/AppContext'
import { TV_MEDIA } from '@/utils/constants'
import AuthLayout from '@/layouts/auth'
import PersonModal from '../PersonModal'

interface Props {
  data: SearchResultItemProps[]
  searchPath: string
  totalPages: number
  pageName: string
  media: string
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

  const { isSignUpModalOpen, isLoading } = useAppContext()

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

  const [selectedMediaType, setSelectedMediaType] = useState(media)

  return (
    <>
      <NextSeo title={pageName} />
      {data ? (
        <AuthLayout
          searchPath={media === TV_MEDIA ? pathToSearchTV : pathToSearchMovie}
          searchPlaceholder={
            media === TV_MEDIA ? 'Search for TV series' : 'Search for Movies'
          }
          isLoading={isRouteLoading || isLoading}
        >
          <MainContent>
            <MediaContainer>
              <MediaContent>
                <Dialog.Root open={isSignUpModalOpen}>
                  <SignUpModal />
                </Dialog.Root>
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
                  {isMediaModalOpen &&
                    selectedMediaId &&
                    (selectedMediaType === 'person' ? (
                      <PersonModal
                        mediaType={selectedMediaType}
                        id={selectedMediaId}
                        handleClickMedia={(type: string, id: string) => {
                          setSelectedMediaType(type)
                          setSelectedMediaId(id)
                        }}
                        onClose={() => {
                          setIsMediaModalOpen(false)
                          setSelectedMediaType(media)
                        }}
                      />
                    ) : (
                      <MediaModal
                        media_type={selectedMediaType}
                        id={selectedMediaId}
                        onClose={() => setIsMediaModalOpen(false)}
                        handleClickMedia={(type: string, id: string) => {
                          setSelectedMediaType(type)
                          setSelectedMediaId(id)
                        }}
                      />
                    ))}
                </Dialog.Root>
              </MediaContent>
            </MediaContainer>
            <PaginationTrendingBar
              actualPage={parseFloat(id as string)}
              searchPath={searchPath}
              totalPages={totalPages}
            />
          </MainContent>
        </AuthLayout>
      ) : (
        <Loading />
      )}
    </>
  )
}
