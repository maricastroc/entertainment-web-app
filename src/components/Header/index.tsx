import { useSession } from 'next-auth/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AvatarContainer,
  AvatarImage,
  ButtonPage,
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
    const basePath = router.basePath
    const homePath = `${basePath}/home`
    router.push(homePath)
  }

  return (
    <Container>
      <FontAwesomeIcon icon={faClapperboard} />
      <ButtonPagesContainer>
        <ButtonPage active={router.pathname === '/home'}>
          <FontAwesomeIcon
            icon={faTableCellsLarge}
            onClick={() => goToHome()}
          />
        </ButtonPage>
        <ButtonPage>
          <FontAwesomeIcon icon={faFilm} />
        </ButtonPage>
        <ButtonPage>
          <FontAwesomeIcon icon={faTv} />
        </ButtonPage>
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
