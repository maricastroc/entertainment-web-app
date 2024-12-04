import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ThemePage from '@/components/ThemePage'
import { SearchResultItemProps } from '@/types/search_result'

export default function TrendingMovie() {
  const router = useRouter()

  const { id } = router.query

  const [data, setData] = useState<SearchResultItemProps[] | undefined>()

  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (id) {
      fetch(`/api/movie/trending/${id}`)
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
    id &&
    data && (
      <ThemePage
        pageName="Trending Movies | MovieMentor"
        searchPath="movie/trending/"
        totalPages={totalPages}
        id={id as string}
        data={data}
        media="movie"
      />
    )
  )
}
