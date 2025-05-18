import { searchPerson } from '@/lib/tmdb'
import { MainContent, MediaContainer, MediaContent } from '@/styles/shared'
import { pathToSearchPerson } from '@/utils'
import { MediaCard } from '@/components/Shared/MediaCard'
import { PaginationBar } from '@/components/Shared/PaginationBar'
import { NextPageContext } from 'next'
import { NextSeo } from 'next-seo'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { PERSON_MEDIA } from '@/utils/constants'
import AuthLayout from '@/layouts/auth'
import { SearchResult } from '@/types/search-result'
import { SearchResultItemProps } from '@/types/search-result-item'
import { ModalSection } from '@/components/Shared/ModalSection'

interface SearchProps {
  data: SearchResult
  id: string
  page: string
}

export default function SearchPerson({ data, id, page }: SearchProps) {
  const isRouteLoading = useLoadingOnRouteChange()

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const [selectedMediaId, setSelectedMediaId] = useState('')

  const [selectedMediaType, setSelectedMediaType] = useState(PERSON_MEDIA)

  return (
    <>
      <NextSeo title="Search Person | MovieMentor" />
      <AuthLayout
        searchPath={pathToSearchPerson}
        isLoading={isRouteLoading}
        searchPlaceholder="Search for People"
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
                        media_type={PERSON_MEDIA}
                        handleClick={() => {
                          setIsMediaModalOpen(true)
                          setSelectedMediaId(item.id || '')
                        }}
                      />
                    </Dialog.Trigger>
                  )
                })}
                <ModalSection
                  openPersonModal={selectedMediaType === PERSON_MEDIA}
                  isOpen={isMediaModalOpen}
                  mediaType={selectedMediaType}
                  selectedId={selectedMediaId}
                  onClose={() => {
                    setIsMediaModalOpen(false)
                    setSelectedMediaType(PERSON_MEDIA)
                  }}
                  onChangeMedia={(type: string, id: string) => {
                    setSelectedMediaType(type)
                    setSelectedMediaId(id)
                  }}
                />
              </Dialog.Root>
            </MediaContent>
          </MediaContainer>
          <PaginationBar
            id={id}
            actualPage={parseFloat(page)}
            searchPath={pathToSearchPerson}
            totalPages={data.total_pages}
          />
        </MainContent>
      </AuthLayout>
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { id, page } = context.query
  const url = searchPerson(String(id), String(page))
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
