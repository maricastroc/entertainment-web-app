import { MainContent, MediaContainer, MediaContent } from './styles'
import { pathToSearchMovie, pathToSearchPerson, pathToSearchTV } from '@/utils'
import { MediaCard } from '@/components/Shared/MediaCard'
import Loading from '@/components/Core/Loading'
import { PaginationTrendingBar } from '@/components/Shared/PaginationTrendingBar'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import MediaModal from '@/components/Shared/MediaModal'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { SignUpModal } from '../SignUpModal'
import { useAppContext } from '@/contexts/AppContext'
import { MOVIE_MEDIA, PERSON_MEDIA, TV_MEDIA } from '@/utils/constants'
import AuthLayout from '@/layouts/auth'
import PersonModal from '../PersonModal'
import { SearchResultItemProps } from '@/types/search-result-item'

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

  type MediaType = typeof TV_MEDIA | typeof MOVIE_MEDIA | typeof PERSON_MEDIA

  const searchConfig: Record<
    MediaType,
    {
      path: string
      placeholder: string
    }
  > = {
    [TV_MEDIA]: {
      path: pathToSearchTV,
      placeholder: 'Search for TV series',
    },
    [MOVIE_MEDIA]: {
      path: pathToSearchMovie,
      placeholder: 'Search for Movies',
    },
    [PERSON_MEDIA]: {
      path: pathToSearchPerson,
      placeholder: 'Search for People',
    },
  }

  console.log(selectedMediaType)

  return (
    <>
      <NextSeo title={pageName} />
      {data ? (
        <AuthLayout
          searchPath={searchConfig[media as MediaType].path}
          searchPlaceholder={searchConfig[media as MediaType].placeholder}
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
                    (selectedMediaType === PERSON_MEDIA ? (
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
                        onClose={() => {
                          setIsMediaModalOpen(false)
                          setSelectedMediaType(media)
                        }}
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
