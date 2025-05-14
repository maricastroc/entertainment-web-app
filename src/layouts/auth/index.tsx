import { SearchBar } from '@/components/Shared/SearchBar'
import { LoadingComponent } from '@/components/Core/LoadingComponent'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { Header } from '@/components/Shared/Header'
import { Container, Wrapper } from './styles'

interface Props {
  isLoading?: boolean
  searchPath: string
  searchPlaceholder: string
  showSearchBar?: boolean
  children: React.ReactNode
}

export default function AuthLayout({
  searchPath,
  searchPlaceholder,
  isLoading = false,
  showSearchBar = true,
  children,
}: Props) {
  const isRouteLoading = useLoadingOnRouteChange()

  return (
    <Wrapper>
      <Header />
      <Container>
        {showSearchBar && (
          <SearchBar searchPath={searchPath} placeholder={searchPlaceholder} />
        )}
        {children}
      </Container>
      {(isRouteLoading || isLoading) && <LoadingComponent hasOverlay />}
    </Wrapper>
  )
}
