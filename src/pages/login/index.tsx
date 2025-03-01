import { NextSeo } from 'next-seo'
import {
  CoverContainer,
  Heading,
  SignInPageWrapper,
  DividerLine,
  WelcomeContainer,
  WelcomeContent,
} from './styles'

import Image from 'next/image'
import CoverImage from '../../../public/cover.png'
import SignInForm from '@/components/SignInForm'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { useAppContext } from '@/contexts/AppContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LoadingComponent } from '@/components/LoadingComponent'

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
        <LoadingComponent />
      ) : (
        <SignInPageWrapper>
          <CoverContainer>
            <Image
              fetchPriority="high"
              src={CoverImage}
              alt="Application logo"
              width={700}
              quality={100}
              className="cover_image"
            />
          </CoverContainer>
          <DividerLine />
          <WelcomeContainer>
            <WelcomeContent>
              <Heading>
                <h2>Welcome!</h2>
                <p>Please, login or enter as a guest.</p>
              </Heading>
              <SignInForm />
            </WelcomeContent>
          </WelcomeContainer>
        </SignInPageWrapper>
      )}
    </>
  )
}
