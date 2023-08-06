import { useSession } from 'next-auth/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AvatarContainer,
  AvatarImage,
  ButtonPagesContainer,
  Container,
} from './styles'
import {
  faClapperboard,
  faFilm,
  faTableCellsLarge,
  faTv,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

export function Header() {
  const session = useSession()
  const router = useRouter()

  async function goToHome() {
    await router.push('../home')
  }

  return (
    <Container>
      <FontAwesomeIcon icon={faClapperboard} />
      <ButtonPagesContainer>
        <FontAwesomeIcon icon={faTableCellsLarge} onClick={() => goToHome()} />
        <FontAwesomeIcon icon={faFilm} />
        <FontAwesomeIcon icon={faTv} />
      </ButtonPagesContainer>
      <AvatarContainer>
        <AvatarImage
          src={session.data?.user?.image ?? 'https://github.com/octocat.png'}
          alt=""
        />
      </AvatarContainer>
    </Container>
  )
}
