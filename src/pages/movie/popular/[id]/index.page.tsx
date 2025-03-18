import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ThemePage from '@/components/Shared/ThemePage'

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

export default function PopularMovies() {
  const router = useRouter()

  const { id } = router.query

  const [data, setData] = useState<SearchResultItemProps[] | undefined>()

  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (id) {
      fetch(`/api/movie/popular/${id}`)
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
        media="movie"
        pageName="Popular Movies | MovieMentor"
        searchPath="movie/popular/"
        data={data}
        id={id as string}
        totalPages={totalPages}
      />
    )
  )
}
