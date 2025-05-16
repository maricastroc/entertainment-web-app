import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ThemePage from '@/components/Shared/ThemePage'
import { SearchResultItemProps } from '@/types/search-result-item'

export default function TrendingTv() {
  const router = useRouter()

  const { id } = router.query

  const [data, setData] = useState<SearchResultItemProps[] | undefined>()

  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (id) {
      fetch(`/api/tv/trending/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data.results)
          setTotalPages(data.total_pages)
        })
        .catch((error) => {
          console.error('Error getting movie details:', error)
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
        pageName="Trending TV Series | MovieMentor"
        searchPath="tv/trending/"
      />
    )
  )
}
