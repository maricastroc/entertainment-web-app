import { useSession } from 'next-auth/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AvatarContainer,
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

  async function goToTvGenre() {
    const basePath = router.basePath
    const tvGenrePath = `${basePath}/tv`
    router.push(tvGenrePath)
  }

  async function goToMovieGenre() {
    const basePath = router.basePath
    const tvGenrePath = `${basePath}/movie`
    router.push(tvGenrePath)
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
        <ButtonPage active={router.pathname === '/movie'}>
          <FontAwesomeIcon icon={faFilm} onClick={() => goToMovieGenre()} />
        </ButtonPage>
        <ButtonPage active={router.pathname === '/tv'}>
          <FontAwesomeIcon icon={faTv} onClick={() => goToTvGenre()} />
        </ButtonPage>
      </ButtonPagesContainer>
      <AvatarContainer>
        <img
          src={
            session.data?.user?.avatarUrl ?? 'https://github.com/octocat.png'
          }
          alt=""
        />
      </AvatarContainer>
    </Container>
  )
}
