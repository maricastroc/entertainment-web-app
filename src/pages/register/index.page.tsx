import { NextSeo } from 'next-seo'
import { Container, LogoWrapper } from './styles'

import SignUpForm from '@/pages/register/partials/SignUpForm'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { useAppContext } from '@/contexts/AppContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LoadingComponent } from '@/components/LoadingComponent'
import Logo from '../../../public/logo.svg'
import Image from 'next/image'

export default function Login() {
  const isRouteLoading = useLoadingOnRouteChange()

  const router = useRouter()

  const { loggedUser } = useAppContext()

  useEffect(() => {
    if (loggedUser) {
      router.push('/home')
    }
  }, [loggedUser, router])

  return (
    <>
      <NextSeo title="Login | Book Wise" />
      {isRouteLoading ? (
        <LoadingComponent hasOverlay withBackground />
      ) : (
        <Container>
          <LogoWrapper>
            <Image alt="" src={Logo} />
            <h2>Movie Mentor</h2>
          </LogoWrapper>
          <SignUpForm />
        </Container>
      )}
    </>
  )
}
