import { Container, SearchContent, SearchInput } from './styles'
import SearchIcon from '../../../../public/assets/icon-search.svg'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

interface SearchBarProps {
  searchPath: string
  placeholder: string
}

export function SearchBar({ searchPath, placeholder }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (debouncedQuery) {
      const currentQuery = router.query.id

      if (debouncedQuery !== currentQuery) {
        router.push(`${searchPath}${debouncedQuery.trim()}?page=1`)
      }
    }
  }, [debouncedQuery, searchPath, router])

  return (
    <Container>
      <SearchContent>
        <Image alt="" src={SearchIcon} />
        <SearchInput
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </SearchContent>
    </Container>
  )
}
