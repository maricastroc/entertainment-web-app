import {
  ClearButton,
  Container,
  SearchContent,
  SearchIconWrapper,
  SearchInput,
} from './styles'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '@/contexts/AppContext'
import { MagnifyingGlass, X } from 'phosphor-react'

interface SearchBarProps {
  searchPath: string
  placeholder: string
}

export function SearchBar({ searchPath, placeholder }: SearchBarProps) {
  const router = useRouter()

  const { searchTerm, handleSetSearchTerm } = useAppContext()

  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    if (debouncedQuery) {
      const currentQuery = router.query.id

      if (debouncedQuery !== currentQuery) {
        router.push(`${searchPath}${debouncedQuery.trim()}?page=1`)
      }
    }
  }, [debouncedQuery, searchPath, router])

  const handleClearSearch = () => {
    handleSetSearchTerm('')
    router.push('/home')
  }

  return (
    <Container>
      <SearchContent>
        <SearchIconWrapper>
          <MagnifyingGlass size={26} />
        </SearchIconWrapper>

        <SearchInput
          placeholder={placeholder}
          onChange={(e) => handleSetSearchTerm(e.target.value)}
          value={searchTerm}
          spellCheck={false}
        />

        {searchTerm?.length > 0 && (
          <ClearButton onClick={handleClearSearch} aria-label="Limpar busca">
            <X size={24} weight="bold" />
          </ClearButton>
        )}
      </SearchContent>
    </Container>
  )
}
