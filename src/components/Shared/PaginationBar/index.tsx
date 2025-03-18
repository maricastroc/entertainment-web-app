import { useRouter } from 'next/router'
import { Container, NextButton, Pagination, PrevButton } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

interface PaginationBarProps {
  searchPath: string
  actualPage: number
  totalPages: number
  id: string
}

export function PaginationBar({
  searchPath,
  actualPage,
  totalPages,
  id,
}: PaginationBarProps) {
  const router = useRouter()

  function handleNextPage() {
    actualPage === totalPages
      ? router.push(`${searchPath}${id}?page=1`)
      : router.push(`${searchPath}${id}?page=${actualPage + 1}`)
  }

  function handlePreviousPage() {
    if (actualPage > 1) {
      router.push(`${searchPath}${id}?page=${actualPage - 1}`)
    }
  }

  return (
    <Container>
      <PrevButton
        onClick={() => {
          if (actualPage > 1) {
            handlePreviousPage()
          }
        }}
        disabled={actualPage === 1}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
        Prev
      </PrevButton>
      <Pagination>
        Page {actualPage} of {totalPages}
      </Pagination>
      <NextButton
        onClick={() => {
          if (actualPage < totalPages) {
            handleNextPage()
          }
        }}
        disabled={actualPage === totalPages}
      >
        Next
        <FontAwesomeIcon icon={faAngleRight} />
      </NextButton>
    </Container>
  )
}
