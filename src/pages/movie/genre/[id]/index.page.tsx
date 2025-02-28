import { discoverMovie, getUrl } from '@/lib/tmdb'
import { SearchResultItemProps } from '@/pages/search/[id]/index.page'
import { NextPageContext } from 'next'
import GenrePage from '@/components/GenrePage'

interface GenreIdProps {
  data: {
    results: SearchResultItemProps[]
    total_pages: number
  }
  id: string
  name: string
  page: string
}

export default function GenreId({ data, id, name, page }: GenreIdProps) {
  return (
    <GenrePage
      data={data}
      id={id}
      name={name}
      currentPage={Number(page)}
      media="movie"
    />
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { id, name, page } = context.query

  const url = getUrl(
    discoverMovie,
    id as string,
    name as string,
    page as string,
  )

  const response = await fetch(url)
  const data = await response.json()

  return {
    props: {
      data,
      id,
      name,
      page,
    },
  }
}
