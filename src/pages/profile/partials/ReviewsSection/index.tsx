/* eslint-disable @typescript-eslint/no-explicit-any */
import { StarsRating } from '@/components/Shared/StarsRating'
import {
  ReviewCard,
  ReviewHeader,
  ReviewContainer,
  ReviewContent,
  ReviewData,
  ReviewDescription,
  ReviewWrapper,
  HeaderSeparator,
  ActionsAndDate,
} from './styles'
import { ReviewProps } from '@/types/review'
import { formatDistanceToNow } from 'date-fns'
import { useScreenSize } from '@/utils/useScreenSize'
import { useEffect, useRef, useState } from 'react'
import { ReviewDropdown } from '@/components/Shared/ReviewDropdown'
import toast from 'react-hot-toast'
import { api } from '@/lib/axios'
import { useAppContext } from '@/contexts/AppContext'
import { MOVIE_MEDIA, TV_MEDIA } from '@/utils/constants'
import { handleApiError } from '@/utils/handleApiError'
import { RatingCardForm } from '@/components/Shared/ReviewSection/partials/RatingCardForm'

interface Props {
  review: ReviewProps
  mutate: any
}

export const ReviewsSection = ({ review, mutate }: Props) => {
  const isMobile = useScreenSize(680)

  const [isRatingCardFormOpen, setIsRatingCardFormOpen] = useState(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const buttonRef = useRef<HTMLButtonElement>(null)

  const { handleSetIsLoading } = useAppContext()

  const [reviewToEdit, setReviewToEdit] = useState<ReviewProps | null>(null)

  async function handleDeleteReview(id: string | undefined, media: string) {
    try {
      const mediaType = `${media === MOVIE_MEDIA ? MOVIE_MEDIA : TV_MEDIA}`

      handleSetIsLoading(true)

      const response = await api.delete(`/ratings/delete`, {
        data: {
          movieId: mediaType === MOVIE_MEDIA ? String(id) : undefined,
          seriesId: mediaType === TV_MEDIA ? String(id) : undefined,
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
    }
  }

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

  return isRatingCardFormOpen && reviewToEdit ? (
    <RatingCardForm
      isProfileScreen
      id={reviewToEdit.media_id}
      media={reviewToEdit.media_type}
      isEdit={!!reviewToEdit}
      rating={reviewToEdit}
      mutate={mutate}
      onClose={() => {
        setIsRatingCardFormOpen(false)
        setReviewToEdit(null)
      }}
    />
  ) : (
    <ReviewCard key={review?.user_id}>
      <ReviewHeader>
        <StarsRating isSmaller rating={review?.rate || 0} />
        <ActionsAndDate>
          <span style={{ display: `${isMobile ? 'none' : 'block'}` }}>
            {formatDistanceToNow(new Date(review?.created_at), {
              addSuffix: true,
            })}
          </span>
          <ReviewDropdown
            review={review}
            isDeleteModalOpen={isDeleteModalOpen}
            isDropdownOpen={isDropdownOpen}
            buttonRef={buttonRef}
            dropdownRef={dropdownRef}
            handleDeleteReview={() =>
              handleDeleteReview(review?.media_id, review.media_type)
            }
            handleSetIsDeleteModalOpen={(value: boolean) =>
              setIsDeleteModalOpen(value)
            }
            handleSetIsRatingCardFormOpen={(value: boolean) =>
              setIsRatingCardFormOpen(value)
            }
            handleSetReviewToEdit={(value) => setReviewToEdit(value)}
            handleSetIsDropdownOpen={(value: boolean) =>
              setIsDropdownOpen(value)
            }
          />
        </ActionsAndDate>
      </ReviewHeader>
      <HeaderSeparator />
      <ReviewContainer>
        <ReviewContent>
          <img
            src={`https://image.tmdb.org/t/p/original${review?.mediaPoster}`}
            alt=""
          />
          <ReviewWrapper>
            <ReviewData>
              {isMobile && (
                <span>
                  {formatDistanceToNow(new Date(review?.created_at), {
                    addSuffix: true,
                  })}
                </span>
              )}
              <h3>{review?.mediaTitle}</h3>
            </ReviewData>
            {!isMobile && (
              <ReviewDescription>
                <p>{review?.description}</p>
              </ReviewDescription>
            )}
          </ReviewWrapper>
        </ReviewContent>
        {isMobile && (
          <ReviewDescription>
            <p>{review?.description}</p>
          </ReviewDescription>
        )}
      </ReviewContainer>
    </ReviewCard>
  )
}
