import {
  Header,
  Container,
  Content,
  UserInfoContainer,
  UserInfoData,
  Footer,
  RatingActions,
  RatingWrapper,
} from './styles'
import { ReviewProps } from '@/types/review'
import { convertRatingTo5Scale } from '@/utils/convertRatingTo5Scale'
import { StarsRating } from '@/components/Shared/StarsRating'
import { Avatar } from '@/components/Core/Avatar'
import { formatDistanceToNow } from 'date-fns'
import { useAppContext } from '@/contexts/AppContext'
import * as Dialog from '@radix-ui/react-dialog'
import { ThumbsDown, ThumbsUp } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
import { SignUpModal } from '@/components/Shared/SignUpModal'
import { useSession } from 'next-auth/react'
import { ReviewDropdown } from '@/components/Shared/ReviewDropdown'

interface Props {
  review: ReviewProps
  avatarUrl?: string
  isDeleteModalOpen: boolean
  votesUp?: number
  votesDown?: number
  handleSetIsDeleteModalOpen: (value: boolean) => void
  handleSetIsRatingCardFormOpen: (value: boolean) => void
  handleSetReviewToEdit: (review: ReviewProps) => void
  handleDeleteReview: () => void
  handleVote: (
    type: 'UP' | 'DOWN',
    review: ReviewProps,
    isFromAppUser: boolean,
  ) => void
}

export function ReviewCard({
  avatarUrl,
  review,
  isDeleteModalOpen,
  votesDown,
  votesUp,
  handleSetIsRatingCardFormOpen,
  handleDeleteReview,
  handleSetIsDeleteModalOpen,
  handleSetReviewToEdit,
  handleVote,
}: Props) {
  const { user } = useAppContext()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { isSignUpModalOpen, handleSetIsSignUpModalOpen } = useAppContext()

  const session = useSession()

  const dropdownRef = useRef<HTMLDivElement>(null)

  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !isDeleteModalOpen
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDeleteModalOpen])

  return (
    <Container>
      <Header>
        <UserInfoContainer>
          <Avatar
            avatarUrl={
              review?.author_details?.avatar_user_path
                ? review?.author_details?.avatar_user_path
                : avatarUrl
            }
          />
          <UserInfoData>
            <p>{review?.author_details?.name || review?.author}</p>
            <span>
              {formatDistanceToNow(new Date(review?.created_at), {
                addSuffix: true,
              })}
            </span>
          </UserInfoData>
        </UserInfoContainer>
        <StarsRating
          isSmaller
          rating={
            review?.is_from_app_user
              ? review?.author_details?.rating
              : convertRatingTo5Scale(review?.author_details?.rating)
          }
        />
      </Header>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: review?.content }} />
      </Content>

      <Footer>
        <RatingActions>
          <RatingWrapper>
            <ThumbsUp
              onClick={() => {
                if (session?.data?.user) {
                  handleVote('UP', review, review?.is_from_app_user as boolean)
                } else {
                  handleSetIsSignUpModalOpen(true)
                }
              }}
            />
            <p>Helpful • {votesUp}</p>
          </RatingWrapper>
          <RatingWrapper>
            <ThumbsDown
              onClick={() => {
                if (session?.data?.user) {
                  handleVote(
                    'DOWN',
                    review,
                    review?.is_from_app_user as boolean,
                  )
                } else {
                  handleSetIsSignUpModalOpen(true)
                }
              }}
            />
            <p>{votesDown}</p>
          </RatingWrapper>
        </RatingActions>
        {user && review?.user_id === user.id && (
          <ReviewDropdown
            review={review}
            isDeleteModalOpen={isDeleteModalOpen}
            isDropdownOpen={isDropdownOpen}
            buttonRef={buttonRef}
            dropdownRef={dropdownRef}
            handleDeleteReview={handleDeleteReview}
            handleSetIsDeleteModalOpen={handleSetIsDeleteModalOpen}
            handleSetIsRatingCardFormOpen={handleSetIsRatingCardFormOpen}
            handleSetReviewToEdit={handleSetReviewToEdit}
            handleSetIsDropdownOpen={(value: boolean) =>
              setIsDropdownOpen(value)
            }
          />
        )}
      </Footer>

      {isSignUpModalOpen && (
        <Dialog.Root open={isSignUpModalOpen}>
          <SignUpModal hasOverlay={false} />
        </Dialog.Root>
      )}
    </Container>
  )
}
