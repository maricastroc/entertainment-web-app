import { discoverTV, getUrl } from '@/lib/tmdb'
import { NextPageContext } from 'next'
import GenrePage from '@/components/Shared/GenrePage'
import { SearchResultItemProps } from '@/types/search-result-item'

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
      media="tv"
    />
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { id, name, page } = context.query

  const url = getUrl(discoverTV, id as string, name as string, page as string)

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
