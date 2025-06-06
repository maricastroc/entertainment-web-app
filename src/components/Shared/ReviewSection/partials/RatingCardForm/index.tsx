/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Check, Star, X } from 'phosphor-react'
import {
  ActionButton,
  CharacterCounter,
  CharacterCounterWrapper,
  RatingCardFormWrapper,
  FooterWrapper,
  UserActionsWrapper,
  ReviewForm,
  ReviewFormWrapper,
  RatingCardFormHeader,
  UserDetailsWrapper,
} from './styles'

import { Rating } from 'react-simple-star-rating'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppContext } from '@/contexts/AppContext'

import { MOVIE_MEDIA, REVIEW_MAX_LENGTH, TV_MEDIA } from '@/utils/constants'
import { Avatar } from '@/components/Core/Avatar'
import { FormErrors } from '@/components/Core/FormErrors'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import { handleApiError } from '@/utils/handleApiError'
import { ReviewProps } from '@/types/review'
import { useEffect } from 'react'

interface RatingCardFormProps {
  isEdit?: boolean
  id: string
  media: string
  rating?: ReviewProps | null
  isProfileScreen?: boolean
  mutate: () => void
  onClose: () => void
}

const ratingSchema = z.object({
  description: z.string().min(1, 'Description is required.'),
  rate: z.number().positive().max(5, 'Please choose a rating from 1 to 5.'),
})

type RatingFormData = z.infer<typeof ratingSchema>

export function RatingCardForm({
  onClose,
  mutate,
  isProfileScreen = false,
  media,
  rating = null,
  isEdit = false,
  id,
}: RatingCardFormProps) {
  const { register, watch, setValue, formState, handleSubmit } =
    useForm<RatingFormData>({
      resolver: zodResolver(ratingSchema),
      defaultValues: {
        description: isEdit ? rating?.content : '',
        rate: isEdit ? rating?.author_details?.rating ?? 0 : 0,
      },
    })

  const { isSubmitting, errors } = formState

  const session = useSession()

  const { handleSetIsLoading, user } = useAppContext()

  const characterCount = watch('description')?.length || 0

  const handleRating = (rate: number) => setValue('rate', rate)

  const handleSubmitReview = async (data: RatingFormData) => {
    try {
      handleSetIsLoading(true)

      const payload = {
        movieId: media === MOVIE_MEDIA ? String(id) : undefined,
        seriesId: media === TV_MEDIA ? String(id) : undefined,
        description: data.description,
        rate: data.rate,
      }

      const response = isEdit
        ? await api.put(`/ratings/edit`, payload)
        : await api.post(`/ratings`, payload)

      toast.success(response.data.message)
      mutate()
    } catch (error) {
      handleApiError(error)
    } finally {
      handleSetIsLoading(false)
      onClose()
    }
  }

  useEffect(() => {
    if (rating && isEdit) {
      setValue('rate', rating.rate || rating.rating || 0)
      setValue('description', rating.description || rating.content)
    }
  }, [rating, isEdit])

  return (
    <RatingCardFormWrapper
      isProfileScreen={isProfileScreen}
      onSubmit={handleSubmit(handleSubmitReview)}
    >
      <RatingCardFormHeader>
        <UserDetailsWrapper>
          <Avatar
            isClickable={false}
            avatarUrl={user?.avatarUrl}
            variant="medium"
          />
          <p>{session?.data?.user?.name}</p>
        </UserDetailsWrapper>
        <Rating
          initialValue={watch('rate')}
          onClick={handleRating}
          emptyIcon={<Star size={20} />}
          fillIcon={<Star weight="fill" size={20} />}
          emptyColor="#1595AA"
          fillColor="#1595AA"
          {...register('rate')}
        />
      </RatingCardFormHeader>

      <ReviewFormWrapper>
        <ReviewForm
          placeholder="Write your review here"
          maxLength={REVIEW_MAX_LENGTH}
          spellCheck={false}
          {...register('description')}
        />
      </ReviewFormWrapper>

      <FooterWrapper>
        <CharacterCounterWrapper>
          <CharacterCounter>
            <span>{characterCount}</span>/{REVIEW_MAX_LENGTH}
          </CharacterCounter>
          {(errors.rate || errors.description) && (
            <>
              <FormErrors
                error={
                  errors.rate?.message && 'Please choose a rating from 1 to 5.'
                }
              />
              <FormErrors error={errors.description?.message} />
            </>
          )}
        </CharacterCounterWrapper>

        <UserActionsWrapper>
          <ActionButton type="button" disabled={isSubmitting} onClick={onClose}>
            <X color="#8381D9" />
          </ActionButton>
          <ActionButton type="submit" disabled={isSubmitting}>
            <Check color="#50B2C0" />
          </ActionButton>
        </UserActionsWrapper>
      </FooterWrapper>
    </RatingCardFormWrapper>
  )
}
