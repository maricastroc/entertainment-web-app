/* eslint-disable react-hooks/exhaustive-deps */
import { pathToSearchAll } from '@/utils'
import { NextSeo } from 'next-seo'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { useEffect, useState } from 'react'
import AuthLayout from '@/layouts/auth'
import { Container } from './styles'
import { EditProfileForm } from './partials/EditProfileForm'

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false)

  const [isClient, setIsClient] = useState(false)

  const isRouteLoading = useLoadingOnRouteChange()

  const handleLoading = (value: boolean) => {
    setIsLoading(value)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <NextSeo
        title="Home | MovieMentor"
        additionalMetaTags={[
          {
            name: 'viewport',
            content:
              'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
          },
        ]}
      />
      {isClient && (
        <AuthLayout
          searchPath={pathToSearchAll}
          searchPlaceholder="Search for Movie / Series"
          isLoading={isRouteLoading || isLoading}
          showSearchBar={false}
        >
          <Container>
            <EditProfileForm isLoading={isLoading} onLoading={handleLoading} />
          </Container>
        </AuthLayout>
      )}
    </>
  )
}
