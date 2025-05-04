/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  RatingContent,
  UserActions,
  ReviewsContainer,
  ReviewCardContainer,
} from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import { ReviewProps } from '@/types/review'
import { RatingCardForm } from './partials/RatingCardForm'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { DeleteModal } from '../DeleteModal'
import { Pencil, Trash } from 'phosphor-react'
import { handleApiError } from '@/utils/handleApiError'
import toast from 'react-hot-toast'
import { api } from '@/lib/axios'
import { useAppContext } from '@/contexts/AppContext'
import { SignUpModal } from '../SignUpModal'
import { ReviewCard } from './partials/ReviewCard'
import { MOVIE_MEDIA, TV_MEDIA } from '@/utils/constants'

interface Props {
  results: ReviewProps[] | undefined
  mutate: any
  id: string
  media: string
}

export function ReviewSection({ id, media, mutate, results }: Props) {
  const { handleSetIsLoading } = useAppContext()

  const session = useSession()

  const [isRatingCardFormOpen, setIsRatingCardFormOpen] = useState(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

  const [hasUserReview, setHasUserReview] = useState(false)

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

  useEffect(() => {
    if (session?.data?.user) {
      const userReview = results?.find((review) => {
        return review?.user_id === session.data.user.id
      })

      setHasUserReview(!!userReview)
    }
  }, [session, results])

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
                <ReviewCard review={review} avatarUrl={avatarUrl} />
                {session?.data?.user &&
                  review?.user_id === session.data?.user.id && (
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
