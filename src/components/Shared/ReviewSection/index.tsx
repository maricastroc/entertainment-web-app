/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Header,
  RatingContent,
  ReviewCard,
  ReviewContent,
  UserInfoContainer,
  UserActions,
  ReviewsContainer,
  UserInfoData,
  ReviewCardContainer,
} from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import { ReviewProps } from '@/types/review'
import { convertRatingTo5Scale } from '@/utils/convertRatingTo5Scale'
import { StarsRating } from '@/components/Shared/StarsRating'
import { Avatar } from '@/components/Core/Avatar'
import { formatDistanceToNow } from 'date-fns'
import { RatingCardForm } from './partials/RatingCardForm'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { DeleteModal } from '../DeleteModal'
import { Pencil, Trash } from 'phosphor-react'
import { handleApiError } from '@/utils/handleApiError'
import toast from 'react-hot-toast'
import { api } from '@/lib/axios'
import { useAppContext } from '@/contexts/AppContext'

interface Props {
  results: ReviewProps[] | undefined
  mutate: any
  id: string
  media: string
}

export function ReviewSection({ id, media, mutate, results }: Props) {
  const session = useSession()

  const { handleSetIsLoading } = useAppContext()

  const [isRatingCardFormOpen, setIsRatingCardFormOpen] = useState(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [reviewToEdit, setReviewToEdit] = useState<ReviewProps | null>(null)

  async function handleDeleteReview() {
    try {
      handleSetIsLoading(true)

      const response = await api.delete(`/ratings/delete`, {
        data: {
          movieId: media === 'movie' ? String(id) : undefined,
          seriesId: media === 'tv' ? String(id) : undefined,
        },
      })

      if (response.data) {
        toast.success(response.data.message)
        mutate()
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      handleSetIsLoading(false)
      setIsDeleteModalOpen(false)
      mutate()
    }
  }

  return (
    <ReviewsContainer>
      <RatingContent>
        <h2>Ratings</h2>
        <button onClick={() => setIsRatingCardFormOpen(true)}>Review</button>
      </RatingContent>

      {isRatingCardFormOpen && (
        <RatingCardForm
          id={id}
          media={media}
          isEdit={!!reviewToEdit}
          rating={reviewToEdit}
          mutate={mutate}
          onClose={() => {
            setIsRatingCardFormOpen(false)
            setReviewToEdit(null)
          }}
        />
      )}

      {results && results?.length > 0 ? (
        results
          .filter(
            (review) =>
              !(
                isRatingCardFormOpen &&
                review?.user_id === session.data?.user.id
              ),
          )
          .map((review) => {
            const avatarUrl = review?.author_details?.avatar_path
              ? review?.author_details?.avatar_path.startsWith('/')
                ? `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
                : review?.author_details?.avatar_path
              : 'https://github.com/octocat.png'

            return (
              <ReviewCardContainer key={review.id}>
                <ReviewCard>
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
                          : convertRatingTo5Scale(
                              review?.author_details?.rating,
                            )
                      }
                    />
                  </Header>
                  <ReviewContent>
                    <div
                      dangerouslySetInnerHTML={{ __html: review?.content }}
                    />
                  </ReviewContent>
                </ReviewCard>
                {review?.user_id === session.data?.user.id && (
                  <>
                    <UserActions>
                      <Dialog.Root open={isDeleteModalOpen}>
                        <Dialog.Trigger asChild>
                          <Trash
                            className="delete_icon"
                            onClick={() => setIsDeleteModalOpen(true)}
                          />
                        </Dialog.Trigger>
                        <DeleteModal
                          onConfirm={() => {
                            handleDeleteReview()
                          }}
                          onClose={() => {
                            setIsDeleteModalOpen(false)
                          }}
                        />
                      </Dialog.Root>
                      <Pencil
                        className="edit_icon"
                        onClick={() => {
                          setReviewToEdit(review)
                          setIsRatingCardFormOpen(true)
                        }}
                      />
                    </UserActions>
                  </>
                )}
              </ReviewCardContainer>
            )
          })
      ) : (
        <p>No reviews available.</p>
      )}
    </ReviewsContainer>
  )
}
