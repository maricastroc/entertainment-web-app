import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ThemePage from '@/components/Shared/ThemePage'
import { SearchResultItemProps } from '@/types/search-result-item'
import { PERSON_MEDIA } from '@/utils/constants'

export default function PopularMovies() {
  const router = useRouter()

  const { id } = router.query

  const [data, setData] = useState<SearchResultItemProps[] | undefined>()

  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (id) {
      fetch(`/api/person/popular/${id}`)
        .then(async (response) => {
          const data = await response.json()
          console.log('Resposta completa da API:', data)
          setData(data.results)
          setTotalPages(data.total_pages)
        })
        .catch((error) => {
          console.error('Erro ao obter detalhes da pessoa:', error)
        })
    }
  }, [id])

  return (
    data &&
    id && (
      <ThemePage
        media={PERSON_MEDIA}
        pageName="Popular People | MovieMentor"
        searchPath="person/popular/"
        data={data}
        id={id as string}
        totalPages={totalPages}
      />
    )
  )
}
