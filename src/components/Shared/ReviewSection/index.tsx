/* eslint-disable @typescript-eslint/no-explicit-any */
import { RatingContent, ReviewsContainer, ReviewCardContainer } from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import { ReviewProps } from '@/types/review'
import { RatingCardForm } from './partials/RatingCardForm'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { handleApiError } from '@/utils/handleApiError'
import toast from 'react-hot-toast'
import { api } from '@/lib/axios'
import { useAppContext } from '@/contexts/AppContext'
import { SignUpModal } from '../SignUpModal'
import { ReviewCard } from './partials/ReviewCard'
import { MOVIE_MEDIA, TV_MEDIA } from '@/utils/constants'

interface Props {
  reviews: ReviewProps[] | undefined
  mutate: any
  id: string
  media: string
}

export function ReviewSection({ id, media, mutate, reviews }: Props) {
  const { handleSetIsLoading } = useAppContext()

  const session = useSession()

  const [isRatingCardFormOpen, setIsRatingCardFormOpen] = useState(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

  const [hasUserReview, setHasUserReview] = useState(false)

  const [updatedReviews, setUpdatedReviews] = useState<
    ReviewProps[] | undefined
  >(reviews)

  const [reviewToEdit, setReviewToEdit] = useState<ReviewProps | null>(null)

  async function handleDeleteReview() {
    try {
      handleSetIsLoading(true)

      const response = await api.delete(`/ratings/delete`, {
        data: {
          movieId: media === MOVIE_MEDIA ? String(id) : undefined,
          seriesId: media === TV_MEDIA ? String(id) : undefined,
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

  async function handleVote(
    type: 'UP' | 'DOWN',
    review: ReviewProps,
    isFromAppUser: boolean,
  ) {
    try {
      const payload = isFromAppUser
        ? { ratingId: review.id, type }
        : { externalReviewId: review.id, type }

      setUpdatedReviews((prev) =>
        prev?.map((r) =>
          r.id === review.id
            ? {
                ...r,
                updated_votes_up:
                  type === 'UP'
                    ? (r.updated_votes_up || 0) + 1
                    : r.updated_votes_up,
                updated_votes_down:
                  type === 'DOWN'
                    ? (r.updated_votes_down || 0) + 1
                    : r.updated_votes_down,
              }
            : r,
        ),
      )

      await api.post('/ratings/vote', payload)
    } catch (error) {
      setUpdatedReviews((prev) =>
        prev?.map((r) =>
          r.id === review.id
            ? {
                ...r,
                updated_votes_up: review.votes?.up || 0,
                updated_votes_down: review.votes?.down || 0,
              }
            : r,
        ),
      )

      handleApiError(error)
    }
  }

  useEffect(() => {
    if (session?.data?.user) {
      const userReview = reviews?.find((review) => {
        return review?.user_id === session.data.user.id
      })

      setHasUserReview(!!userReview)
    }
  }, [session, reviews])

  useEffect(() => {
    if (reviews) {
      const initializedReviews = reviews.map((review) => ({
        ...review,
        updated_votes_up: review.votes?.up || 0,
        updated_votes_down: review.votes?.down || 0,
      }))
      setUpdatedReviews(initializedReviews)
    }
  }, [reviews])

  return (
    <ReviewsContainer>
      <RatingContent>
        <h2>Reviews</h2>
        {(!session?.data?.user || (!hasUserReview && session?.data?.user)) && (
          <Dialog.Root open={isSignUpModalOpen}>
            <Dialog.Trigger asChild>
              <button
                onClick={() => {
                  if (!session?.data?.user) {
                    setIsSignUpModalOpen(true)
                    return
                  }
                  setIsRatingCardFormOpen(true)
                }}
              >
                Review
              </button>
            </Dialog.Trigger>
            <SignUpModal />
          </Dialog.Root>
        )}
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

      {updatedReviews && updatedReviews?.length > 0 ? (
        updatedReviews
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
                <ReviewCard
                  review={review}
                  avatarUrl={avatarUrl}
                  handleVote={handleVote}
                  isDeleteModalOpen={isDeleteModalOpen}
                  handleSetReviewToEdit={(value) => setReviewToEdit(value)}
                  handleSetIsDeleteModalOpen={(value) =>
                    setIsDeleteModalOpen(value)
                  }
                  handleSetIsRatingCardFormOpen={(value) =>
                    setIsRatingCardFormOpen(value)
                  }
                  handleDeleteReview={handleDeleteReview}
                  votesUp={review?.updated_votes_up || 0}
                  votesDown={review.updated_votes_down || 0}
                />
              </ReviewCardContainer>
            )
          })
      ) : (
        <p>No reviews available.</p>
      )}
    </ReviewsContainer>
  )
}
