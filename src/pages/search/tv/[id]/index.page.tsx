import { searchTv } from '@/lib/tmdb'
import { MainContent, MediaContainer, MediaContent } from '@/styles/shared'
import { pathToSearchTV } from '@/utils'
import { MediaCard } from '@/components/Shared/MediaCard'
import { PaginationBar } from '@/components/Shared/PaginationBar'
import { NextPageContext } from 'next'
import { NextSeo } from 'next-seo'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import MediaModal from '@/components/Shared/MediaModal'
import { TV_MEDIA } from '@/utils/constants'
import PersonModal from '@/components/Shared/PersonModal'
import AuthLayout from '@/layouts/auth'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'

interface SearchResultItemProps {
  id: string
  name?: string
  title?: string
  first_air_date?: string
  release_date?: string
  media_type: string
  backdrop_path?: string
  poster_path?: string
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

export default function SearchSeries({ data, id, page }: SearchProps) {
  const isRouteLoading = useLoadingOnRouteChange()

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

  const [selectedMediaType, setSelectedMediaType] = useState(TV_MEDIA)

  return (
    <>
      <NextSeo title="Search TV Series | MovieMentor" />
      <AuthLayout
        searchPath={pathToSearchTV}
        searchPlaceholder="Search for TV Series"
        isLoading={isRouteLoading}
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
                        media_type="tv"
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
                        setSelectedMediaType(TV_MEDIA)
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
            searchPath={pathToSearchTV}
            totalPages={data.total_pages}
          />
        </MainContent>
      </AuthLayout>
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { id, page } = context.query
  const url = searchTv(String(id), String(page))
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
