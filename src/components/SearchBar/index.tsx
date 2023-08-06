import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, SearchButton, SearchContent, SearchInput } from './styles'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useRouter } from 'next/router'

interface SearchBarProps {
  searchPath: string
  placeholder: string
}

export function SearchBar({ searchPath, placeholder }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (query.length !== 0) {
      router.push(`${searchPath}${query.trim()}?page=1`)
      setQuery('')
    }
  }

  return (
    <Container onSubmit={handleSearch}>
      <SearchContent>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <SearchInput
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </SearchContent>
      <SearchButton type="submit">Search</SearchButton>
    </Container>
  )
}
