/* eslint-disable react-hooks/exhaustive-deps */
import { pathToSearchAll } from '@/utils'
import { NextSeo } from 'next-seo'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { useCallback, useEffect, useState } from 'react'
import AuthLayout from '@/layouts/auth'
import {
  Container,
  ContentWrapper,
  ProfileMenu,
  ProfileWrapper,
  VerticalSeparator,
  HorizontalSeparator,
  MenuBtn,
  EmptyReviews,
} from './styles'
import { EditProfileForm } from './partials/EditProfileForm'
import useRequest from '@/utils/useRequest'
import { ReviewProps } from '@/types/review'
import { ReviewsSection } from './partials/ReviewsSection'
import { ReviewsContainer } from '@/components/Shared/MediaModal/styles'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'

interface DataResults {
  formattedRatings: ReviewProps[]
}

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false)

  const [activeSection, setActiveSection] = useState('profile_data')

  const [isClient, setIsClient] = useState(false)

  const isRouteLoading = useLoadingOnRouteChange()

  const { data, mutate } = useRequest<DataResults>({
    url: `/user/reviews`,
    method: 'GET',
  })

  const handleLoading = (value: boolean) => {
    setIsLoading(value)
  }

  const handleLogout = useCallback(() => {
    signOut({ callbackUrl: '/' })
    toast.success('See you soon!')
  }, [])

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
            <ProfileWrapper>
              <ProfileMenu>
                <MenuBtn
                  onClick={() => setActiveSection('profile_data')}
                  isActive={activeSection === 'profile_data'}
                >
                  Profile Data
                </MenuBtn>
                <VerticalSeparator />
                <MenuBtn
                  onClick={() => setActiveSection('ratings')}
                  isActive={activeSection === 'ratings'}
                >
                  Reviews
                </MenuBtn>
                <VerticalSeparator />
                <MenuBtn onClick={handleLogout}>Sign out</MenuBtn>
              </ProfileMenu>
              <HorizontalSeparator />
              <ContentWrapper>
                {activeSection === 'profile_data' && (
                  <EditProfileForm
                    isLoading={isLoading}
                    onLoading={handleLoading}
                  />
                )}
                {activeSection === 'ratings' &&
                  (data?.formattedRatings &&
                  data?.formattedRatings?.length > 0 ? (
                    <ReviewsContainer>
                      {data.formattedRatings.map((review) => {
                        return (
                          <ReviewsSection
                            key={review.id}
                            mutate={mutate}
                            review={review}
                          />
                        )
                      })}
                    </ReviewsContainer>
                  ) : (
                    <EmptyReviews>
                      <FontAwesomeIcon icon={faComments} />
                      <h3>It looks a bit empty around here...</h3>
                      <p>You still have no reviews to show!</p>
                    </EmptyReviews>
                  ))}
              </ContentWrapper>
            </ProfileWrapper>
          </Container>
        </AuthLayout>
      )}
    </>
  )
}
