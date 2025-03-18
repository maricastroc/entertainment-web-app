import { NextSeo } from 'next-seo'
import { Container, LogoWrapper } from './styles'

import SignInForm from '@/pages/login/partials/SignInForm'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LoadingComponent } from '@/components/Core/LoadingComponent'
import Logo from '../../../public/logo.svg'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function Login() {
  const isRouteLoading = useLoadingOnRouteChange()

  const router = useRouter()

  const { status } = useSession()

  useEffect(() => {
    if (status !== 'unauthenticated') {
      router.push('/home')
    }
  }, [status, router])

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
          <SignInForm />
        </Container>
      )}
    </>
  )
}
