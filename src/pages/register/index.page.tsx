import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { Container, LogoWrapper } from './styles'
import SignUpForm from '@/pages/register/partials/SignUpForm'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { LoadingComponent } from '@/components/Core/LoadingComponent'
import Logo from '../../../public/logo.svg'

export default function Register() {
  const isRouteLoading = useLoadingOnRouteChange()

  const [isClient, setIsClient] = useState(false)

  const router = useRouter()

  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home')
    }
  }, [status, router])

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <NextSeo title="Login | Book Wise" />
      {isClient &&
        (isRouteLoading ? (
          <LoadingComponent withBackground />
        ) : (
          <Container>
            <LogoWrapper>
              <Image alt="" src={Logo} />
              <h2>Movie Mentor</h2>
            </LogoWrapper>
            <SignUpForm />
          </Container>
        ))}
    </>
  )
}
