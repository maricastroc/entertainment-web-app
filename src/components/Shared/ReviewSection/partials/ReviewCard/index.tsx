import {
  Header,
  Container,
  Content,
  UserInfoContainer,
  UserInfoData,
  Footer,
  RatingActions,
  RatingWrapper,
  Dropdown,
  DropdownButton,
  DropdownItem,
} from './styles'
import { ReviewProps } from '@/types/review'
import { convertRatingTo5Scale } from '@/utils/convertRatingTo5Scale'
import { StarsRating } from '@/components/Shared/StarsRating'
import { Avatar } from '@/components/Core/Avatar'
import { formatDistanceToNow } from 'date-fns'
import { useAppContext } from '@/contexts/AppContext'
import * as Dialog from '@radix-ui/react-dialog'
import { Pencil, ThumbsDown, ThumbsUp, Trash } from 'phosphor-react'
import { DeleteModal } from '@/components/Shared/DeleteModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'

interface Props {
  review: ReviewProps
  avatarUrl: string
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

  const [userVote, setUserVote] = useState<'UP' | 'DOWN' | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
              onClick={() =>
                handleVote('UP', review, review?.is_from_app_user as boolean)
              }
            />
            <p>Helpful • {votesUp}</p>
          </RatingWrapper>
          <RatingWrapper>
            <ThumbsDown
              onClick={() =>
                handleVote('DOWN', review, review?.is_from_app_user as boolean)
              }
            />
            <p>{votesDown}</p>
          </RatingWrapper>
        </RatingActions>
        {user && review?.user_id === user.id && (
          <>
            <DropdownButton
              ref={buttonRef}
              onClick={() => setIsDropdownOpen(true)}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </DropdownButton>
            {isDropdownOpen && (
              <Dropdown ref={dropdownRef}>
                <Dialog.Root open={isDeleteModalOpen}>
                  <Dialog.Trigger asChild>
                    <DropdownItem
                      onClick={() => handleSetIsDeleteModalOpen(true)}
                    >
                      <Trash className="delete_icon" />
                      <p>Delete Review</p>
                    </DropdownItem>
                  </Dialog.Trigger>
                  <DeleteModal
                    onConfirm={() => {
                      handleDeleteReview()
                    }}
                    onClose={() => {
                      handleSetIsDeleteModalOpen(false)
                    }}
                  />
                </Dialog.Root>
                <DropdownItem
                  onClick={() => {
                    handleSetReviewToEdit(review)
                    handleSetIsRatingCardFormOpen(true)
                  }}
                >
                  <Pencil className="edit_icon" />
                  <p>Edit Review</p>
                </DropdownItem>
              </Dropdown>
            )}
          </>
        )}
      </Footer>
    </Container>
  )
}
