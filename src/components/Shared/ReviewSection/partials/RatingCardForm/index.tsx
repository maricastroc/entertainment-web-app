/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { AVATAR_URL_DEFAULT, REVIEW_MAX_LENGTH } from '@/utils/constants'
import { Avatar } from '@/components/Core/Avatar'
import { FormErrors } from '@/components/Core/FormErrors'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import { handleApiError } from '@/utils/handleApiError'
import { ReviewProps } from '@/types/review'

interface RatingCardFormProps {
  isEdit?: boolean
  id: string
  media: string
  rating?: ReviewProps | null
  mutate: any
  onClose: () => void
}

const ratingCardFormSchema = z.object({
  description: z.string().nullable(),
  rate: z
    .number()
    .positive({ message: 'Please choose a rating from 1 to 5.' })
    .max(5),
})

type RatingCardFormData = z.infer<typeof ratingCardFormSchema>

export function RatingCardForm({
  onClose,
  mutate,
  media,
  rating = null,
  isEdit = false,
  id,
  ...rest
}: RatingCardFormProps) {
  const {
    register,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<RatingCardFormData>({
    resolver: zodResolver(ratingCardFormSchema),
    defaultValues: {
      description: isEdit ? rating?.content : '',
      rate: isEdit ? rating?.author_details?.rating : 0,
    },
  })

  const session = useSession()

  const { handleSetIsLoading } = useAppContext()

  const handleRating = (rate: number) => {
    setValue('rate', rate)
  }

  const characterCount = watch('description')?.split('').length || 0

  async function handleCreateReview(event: React.FormEvent) {
    event.preventDefault()

    try {
      handleSetIsLoading(true)

      const response = await api.post(`/ratings`, {
        movieId: media === 'movie' ? String(id) : undefined,
        seriesId: media === 'tv' ? String(id) : undefined,
        description: watch('description'),
        rate: Number(watch('rate')),
      })

      if (response.data) {
        toast.success(response.data.message)
        mutate()
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      handleSetIsLoading(false)
      onClose()
    }
  }

  async function handleEditReview(event: React.FormEvent) {
    event.preventDefault()

    try {
      handleSetIsLoading(true)

      const response = await api.put(`/ratings/edit`, {
        movieId: media === 'movie' ? String(id) : undefined,
        seriesId: media === 'tv' ? String(id) : undefined,
        description: watch('description'),
        rate: Number(watch('rate')),
      })

      if (response.data) {
        toast.success(response.data.message)
        mutate()
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      handleSetIsLoading(false)
      onClose()
    }
  }

  return (
    <RatingCardFormWrapper
      onSubmit={isEdit ? handleEditReview : handleCreateReview}
      {...rest}
    >
      <RatingCardFormHeader>
        <UserDetailsWrapper>
          <Avatar
            isClickable={false}
            avatarUrl={session?.data?.user?.avatarUrl ?? AVATAR_URL_DEFAULT}
            variant="medium"
          />
          <p>{session?.data?.user?.name}</p>
        </UserDetailsWrapper>
        <Rating
          initialValue={rating?.author_details?.rating}
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
              <FormErrors error={errors?.rate?.message} />
              <FormErrors error={errors?.description?.message} />
            </>
          )}
        </CharacterCounterWrapper>
        <UserActionsWrapper>
          <ActionButton
            type="button"
            disabled={isSubmitting}
            onClick={() => onClose()}
          >
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
