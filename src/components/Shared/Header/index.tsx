import { signOut } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AuthButton,
  AvatarContainer,
  ButtonPage,
  ButtonPagesContainer,
  ButtonsContainer,
  Container,
} from './styles'
import { faClapperboard } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { SignIn, SignOut, User } from 'phosphor-react'
import IconBookmark from '../../../../public/assets/icon-nav-bookmark.svg'
import IconHome from '../../../../public/assets/icon-nav-home.svg'
import IconMovie from '../../../../public/assets/icon-nav-movies.svg'
import IconTv from '../../../../public/assets/icon-nav-tv-series.svg'
import Image from 'next/image'
import { useState, useEffect, useRef, RefObject, useCallback } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '@/contexts/AppContext'

export function Header() {
  const { user } = useAppContext()

  const router = useRouter()

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const avatarRef = useRef<HTMLDivElement | null>(null)

  const logoutModalRef = useRef<HTMLDivElement | null>(null)

  const handleLogout = useCallback(() => {
    signOut({ callbackUrl: '/' })
    toast.success('See you soon!')
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node) &&
        logoutModalRef.current &&
        !logoutModalRef.current.contains(event.target as Node)
      ) {
        setIsLogoutModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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

  async function goToBookmark() {
    const basePath = router.basePath
    const bookmarkPath = `${basePath}/bookmark`
    router.push(bookmarkPath)
  }

  return (
    <Container>
      <FontAwesomeIcon icon={faClapperboard} />
      <ButtonPagesContainer>
        <ButtonPage active={router.pathname === '/home'}>
          <Image src={IconHome} alt="" onClick={() => goToHome()} />
        </ButtonPage>
        <ButtonPage active={router.pathname === '/movie'}>
          <Image alt="" src={IconMovie} onClick={() => goToMovieGenre()} />
        </ButtonPage>
        <ButtonPage active={router.pathname === '/tv'}>
          <Image alt="" src={IconTv} onClick={() => goToTvGenre()} />
        </ButtonPage>
        {user && (
          <ButtonPage active={router.pathname === '/bookmark'}>
            <Image alt="" src={IconBookmark} onClick={() => goToBookmark()} />
          </ButtonPage>
        )}
      </ButtonPagesContainer>

      <AvatarContainer
        ref={avatarRef as RefObject<HTMLAnchorElement>}
        onClick={() => setIsLogoutModalOpen(!isLogoutModalOpen)}
      >
        <img src={user?.avatarUrl ?? 'https://github.com/octocat.png'} alt="" />

        {isLogoutModalOpen && (
          <ButtonsContainer>
            <AuthButton
              ref={logoutModalRef}
              onClick={() => {
                if (user) {
                  handleLogout()
                } else {
                  router.push('/')
                }
              }}
            >
              {user ? (
                <SignOut style={{ color: '#7E93BC' }} />
              ) : (
                <SignIn style={{ color: '#7E93BC' }} />
              )}
              <p>{user ? 'sign out' : 'sign in'}</p>
            </AuthButton>
            {user && (
              <AuthButton onClick={() => router.push('/profile')}>
                <User style={{ color: '#7E93BC' }} />
                <p>edit profile</p>
              </AuthButton>
            )}
          </ButtonsContainer>
        )}
      </AvatarContainer>
    </Container>
  )
}
