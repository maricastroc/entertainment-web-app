import { searchMovie } from '@/lib/tmdb'
import { MainContent, MediaContainer, MediaContent } from '@/styles/shared'
import { pathToSearchMovie } from '@/utils'
import { MediaCard } from '@/components/Shared/MediaCard'
import { PaginationBar } from '@/components/Shared/PaginationBar'
import { NextPageContext } from 'next'
import { NextSeo } from 'next-seo'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import MediaModal from '@/components/Shared/MediaModal'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { MOVIE_MEDIA } from '@/utils/constants'
import PersonModal from '@/components/Shared/PersonModal'
import AuthLayout from '@/layouts/auth'
import { SearchResult } from '@/types/search-result'
import { SearchResultItemProps } from '@/types/search-result-item'

interface SearchProps {
  data: SearchResult
  id: string
  page: string
}

export default function SearchMovie({ data, id, page }: SearchProps) {
  const isRouteLoading = useLoadingOnRouteChange()

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

  const [selectedMediaType, setSelectedMediaType] = useState(MOVIE_MEDIA)

  return (
    <>
      <NextSeo title="Search Movie | MovieMentor" />
      <AuthLayout
        searchPath={pathToSearchMovie}
        isLoading={isRouteLoading}
        searchPlaceholder="Search for Movies"
      >
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
                        media_type={MOVIE_MEDIA}
                        handleClick={() => {
                          setIsMediaModalOpen(true)
                          setSelectedMediaId(item.id || '')
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
                        setSelectedMediaType(MOVIE_MEDIA)
                      }}
                    />
                  ) : (
                    <MediaModal
                      media_type={selectedMediaType}
                      handleClickMedia={(type: string, id: string) => {
                        setSelectedMediaType(type)
                        setSelectedMediaId(id)
                      }}
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
            searchPath={pathToSearchMovie}
            totalPages={data.total_pages}
          />
        </MainContent>
      </AuthLayout>
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
