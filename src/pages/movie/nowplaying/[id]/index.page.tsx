import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SearchResultItemProps } from '@/types/search_result'
import ThemePage from '@/components/Shared/ThemePage'

export default function NowPlayingMovies() {
  const router = useRouter()

  const { id } = router.query

  const [data, setData] = useState<SearchResultItemProps[] | undefined>()

  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (id) {
      fetch(`/api/movie/now/${id}`)
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
        media="movie"
        pageName="Now Playing Movies | MovieMentor"
        searchPath="movie/now/"
      />
    )
  )
}
