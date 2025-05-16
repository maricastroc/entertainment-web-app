import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ThemePage from '@/components/Shared/ThemePage'
import { SearchResultItemProps } from '@/types/search-result-item'

export default function PopularTv() {
  const router = useRouter()
  const { id } = router.query

  const [data, setData] = useState<SearchResultItemProps[] | undefined>()

  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (id) {
      fetch(`/api/tv/popular/${id}`)
        .then(async (response) => {
          const data = await response.json()
          console.log('Resposta completa da API:', data) // 👈 Visualiza aqui
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
        id={id as string}
        data={data}
        totalPages={totalPages}
        media="tv"
        pageName="Popular TV Series | MovieMentor"
        searchPath="tv/popular/"
      />
    )
  )
}
