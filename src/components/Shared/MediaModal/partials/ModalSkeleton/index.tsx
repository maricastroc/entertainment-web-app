import Skeleton from 'react-loading-skeleton'
import {
  DetailsContent,
  InfoContent,
  MediaContent,
  MediaWrapper,
  OtherInfoContent,
  ReviewItem,
  ReviewsSection,
  Separator,
  TitleContainer,
  TitleContent,
} from './styles'
import { useScreenSize } from '@/utils/useScreenSize'

export const ModalSkeleton = () => {
  const isMobile = useScreenSize(680)

  const skeletonBaseProps = {
    baseColor: '#464f5e',
    highlightColor: '#63717f',
    className: 'rounded-lg',
  }

  const getResponsiveWidth = (mobileWidth: string, desktopWidth: string) => ({
    width: '70vw',
    style: { maxWidth: isMobile ? mobileWidth : desktopWidth },
  })

  const ResponsiveSkeleton = ({
    height,
    mobileMax,
    desktopMax,
  }: {
    height: number
    mobileMax: string
    desktopMax: string
  }) => (
    <Skeleton
      {...getResponsiveWidth(mobileMax, desktopMax)}
      height={height}
      {...skeletonBaseProps}
    />
  )

  return (
    <>
      <MediaContent>
        <MediaWrapper>
          <Skeleton
            width="80vw"
            style={{ maxWidth: '12rem' }}
            height={250}
            {...skeletonBaseProps}
          />

          <TitleContainer>
            <TitleContent>
              <ResponsiveSkeleton
                height={24}
                mobileMax="13rem"
                desktopMax="13rem"
              />
              <ResponsiveSkeleton
                height={14}
                mobileMax="20rem"
                desktopMax="16rem"
              />
            </TitleContent>

            <Separator />

            <InfoContent>
              {[40, 40, 40].map((height, index) => (
                <div key={index}>
                  <ResponsiveSkeleton
                    height={height}
                    mobileMax="40rem"
                    desktopMax="19.5rem"
                  />
                  {index < 2 && <Separator />}
                </div>
              ))}
            </InfoContent>
          </TitleContainer>
        </MediaWrapper>

        <DetailsContent>
          <ResponsiveSkeleton
            height={80}
            mobileMax="40rem"
            desktopMax="32.5rem"
          />
          <Separator />
          <ResponsiveSkeleton
            height={40}
            mobileMax="40rem"
            desktopMax="32.5rem"
          />
        </DetailsContent>
      </MediaContent>

      <OtherInfoContent>
        {[90, 90].map((height, index) => (
          <Skeleton
            key={index}
            width="80vw"
            style={{ maxWidth: isMobile ? '45rem' : '35rem' }}
            height={height}
            {...skeletonBaseProps}
          />
        ))}
      </OtherInfoContent>

      <ReviewsSection>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <ReviewItem key={index}>
              <ResponsiveSkeleton
                height={90}
                mobileMax="45rem"
                desktopMax="30rem"
              />
            </ReviewItem>
          ))}
      </ReviewsSection>
    </>
  )
}
