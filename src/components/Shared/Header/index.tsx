import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonPagesContainer, Container } from './styles'
import { faClapperboard } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import IconBookmark from '../../../../public/assets/icon-nav-bookmark.svg'
import IconHome from '../../../../public/assets/icon-nav-home.svg'
import IconMovie from '../../../../public/assets/icon-nav-movies.svg'
import IconTv from '../../../../public/assets/icon-nav-tv-series.svg'
import { useCallback } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import * as Dialog from '@radix-ui/react-dialog'
import { SignUpModal } from '../SignUpModal'
import { NavButton } from './partials/NavButton'
import { AvatarButton } from './AvatarButton'

export function Header() {
  const {
    user,
    handleSetSearchTerm,
    isSignUpModalOpen,
    handleSetIsSignUpModalOpen,
  } = useAppContext()

  const router = useRouter()

  const navigateTo = useCallback(
    (route: string) => {
      handleSetSearchTerm('')
      router.push(`${router.basePath}/${route}`)
    },
    [handleSetSearchTerm, router],
  )

  const handleBookmarkClick = useCallback(() => {
    if (!user) {
      handleSetIsSignUpModalOpen(true)
      return
    }
    navigateTo('bookmark')
  }, [user, handleSetIsSignUpModalOpen, navigateTo])

  const navigationRoutes = [
    {
      path: '/home',
      icon: IconHome,
      tooltip: 'Homepage',
      action: () => navigateTo('home'),
    },
    {
      path: '/movie',
      icon: IconMovie,
      tooltip: 'Movies Page',
      action: () => navigateTo('movie'),
    },
    {
      path: '/tv',
      icon: IconTv,
      tooltip: 'TV Shows Page',
      action: () => navigateTo('tv'),
    },
    {
      path: '/bookmark',
      icon: IconBookmark,
      tooltip: 'Bookmarks Page',
      action: handleBookmarkClick,
    },
  ]

  return (
    <Container>
      <FontAwesomeIcon icon={faClapperboard} />

      <ButtonPagesContainer>
        {navigationRoutes.map((route, index) =>
          route.path === '/bookmark' ? (
            <Dialog.Root key={index} open={isSignUpModalOpen}>
              <Dialog.Trigger asChild>
                <NavButton
                  icon={route.icon}
                  active={router.pathname === route.path}
                  tooltipContent={route.tooltip}
                  tooltipId={`${route.path}-tooltip`}
                  onClick={route.action}
                />
              </Dialog.Trigger>
              <SignUpModal hasOverlay={false} />
            </Dialog.Root>
          ) : (
            <NavButton
              key={index}
              icon={route.icon}
              active={router.pathname === route.path}
              tooltipContent={route.tooltip}
              tooltipId={`${route.path}-tooltip`}
              onClick={route.action}
            />
          ),
        )}
      </ButtonPagesContainer>

      <AvatarButton />
    </Container>
  )
}
