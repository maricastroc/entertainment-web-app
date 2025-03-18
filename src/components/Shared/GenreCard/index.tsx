import { Container } from './styles'
import { useRouter } from 'next/router'

interface GenreCardProps {
  id: string
  name: string
  media_type: string
  background: string
}

export function GenreCard({
  id,
  name,
  media_type,
  background,
}: GenreCardProps) {
  const router = useRouter()

  const basePath = router.basePath

  async function goToGenreId() {
    router.push(`${basePath}/${media_type}/genre/${id}?name=${name}&page=1`)
  }

  return (
    <Container className={background} onClick={goToGenreId}>
      <p>{name}</p>
    </Container>
  )
}
