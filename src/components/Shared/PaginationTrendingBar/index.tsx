import { useRouter } from 'next/router'
import { Container, NextButton, Pagination, PrevButton } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

interface PaginationBarProps {
  searchPath: string
  actualPage: number
  totalPages: number
}

export function PaginationTrendingBar({
  searchPath,
  actualPage,
  totalPages,
}: PaginationBarProps) {
  const router = useRouter()

  function handleNextPage() {
    const basePath = router.basePath
    actualPage === totalPages
      ? router.push(`${basePath}/${searchPath}1`)
      : router.push(`${basePath}/${searchPath}${actualPage + 1}`)
  }

  function handlePreviousPage() {
    const basePath = router.basePath
    if (actualPage > 1) {
      router.push(`${basePath}/${searchPath}${actualPage - 1}`)
    }
  }

  return (
    <Container>
      <PrevButton
        onClick={() => handlePreviousPage()}
        disabled={actualPage === 1}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
        Prev
      </PrevButton>
      <Pagination>
        Page {actualPage} of {totalPages}
      </Pagination>
      <NextButton
        onClick={() => handleNextPage()}
        disabled={actualPage === totalPages}
      >
        Next
        <FontAwesomeIcon icon={faAngleRight} />
      </NextButton>
    </Container>
  )
}
