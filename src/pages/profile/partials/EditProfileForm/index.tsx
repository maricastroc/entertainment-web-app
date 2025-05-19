/* eslint-disable react-hooks/exhaustive-deps */
import * as Dialog from '@radix-ui/react-dialog'
import { ImageCropper } from '@/components/Shared/ImageCropper'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  AvatarSection,
  AvatarUploadButton,
  AvatarUploadWrapper,
  DeleteAvatarButton,
} from '@/pages/register/partials/SignUpForm/styles'
import { InputContainer } from '@/components/Core/InputContainer'
import { Input } from '@/components/Core/Input'
import { FormErrors } from '@/components/Core/FormErrors'
import { Checkbox } from '@/components/Core/Checkbox'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppContext } from '@/contexts/AppContext'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { handleApiError } from '@/utils/handleApiError'
import { TrashSimple } from 'phosphor-react'
import { AvatarUploadPreview } from '@/components/Core/AvatarUploadPreview'
import AvatarDefaultImage from '../../../../../public/assets/avatar_mockup.png'
import { Button } from '@/components/Core/Button'
import { truncateMiddle } from '@/utils/truncateMiddle'
import { Form } from './styles'

export const profileFormSchema = (changePassword: boolean) =>
  z.object({
    userId: z.string().min(3, { message: 'User ID is required.' }),
    email: z.string().min(3, { message: 'E-mail is required.' }),
    name: z.string().min(3, { message: 'Name is required.' }),
    avatarUrl: z.custom<File>().optional(),
    oldPassword: changePassword
      ? z
          .string()
          .min(8, { message: 'Password must be at least 8 characters long.' })
      : z.string().optional(),
    newPassword: changePassword
      ? z
          .string()
          .min(8, { message: 'Password must be at least 8 characters long.' })
      : z.string().optional(),
  })

export type ProfileFormSchema = z.infer<ReturnType<typeof profileFormSchema>>

interface Props {
  isLoading: boolean
  onLoading: (value: boolean) => void
}

export const EditProfileForm = ({ isLoading, onLoading }: Props) => {
  const [changePassword, setChangePassword] = useState(false)

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const [avatarPath, setAvatarPath] = useState('')

  const [showCropper, setShowCropper] = useState(false)

  const [originalImage, setOriginalImage] = useState<string | null>(null)

  const { user, handleSetUser } = useAppContext()

  const inputFileRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema(changePassword)),
    defaultValues: { email: '' },
  })

  async function onSubmit(data: ProfileFormSchema) {
    if (user) {
      const formData = new FormData()

      formData.append('email', data.email)
      formData.append('name', data.name)
      formData.append('userId', user?.id as string)

      if (data?.avatarUrl) {
        formData.append('avatarUrl', data.avatarUrl)
      }

      if (data?.newPassword) {
        formData.append('newPassword', data.newPassword)
      }

      if (data?.oldPassword) {
        formData.append('oldPassword', data.oldPassword)
      }

      try {
        onLoading(true)

        await api.put(`/user/edit/${data?.userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        toast.success('User successfully updated!')

        router.push('/home')

        handleSetUser({
          ...user,
          name: data.name,
          email: data.email,
          avatarUrl: avatarPreview || user.avatarUrl,
        })
      } catch (error) {
        handleApiError(error)
      } finally {
        onLoading(false)
      }
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setValue('avatarUrl', file)
      setAvatarPath(file?.name as string)

      const reader = new FileReader()
      reader.onload = () => {
        setAvatarPreview(reader.result as string)

        setOriginalImage(reader.result as string)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCroppedImage = (croppedImage: string) => {
    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'avatar.jpg', {
          type: 'image/jpeg',
        })
        setValue('avatarUrl', file)
        setAvatarPreview(croppedImage)
        setShowCropper(false)
      })
  }

  const handleAvatarChangeClick = () => {
    inputFileRef.current?.click()
  }

  const handleDeleteAvatar = () => {
    setAvatarPreview(null)
    setValue('avatarUrl', undefined)
    setAvatarPath('')

    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }
  }

  useEffect(() => {
    if (user) {
      setValue('email', user.email)
      setValue('name', user.name)
      setValue('userId', user.id as string)

      setAvatarPath(truncateMiddle(user?.avatarUrl))

      setAvatarPreview(user?.avatarUrl)
    }
  }, [user])

  return (
    <>
      <Dialog.Root open={!!originalImage && showCropper}>
        <ImageCropper
          src={originalImage as string}
          onCrop={handleCroppedImage}
          aspectRatio={1}
          onClose={() => setShowCropper(false)}
        />
      </Dialog.Root>
      <Form onSubmit={handleSubmit(onSubmit)} expandForm={!!changePassword}>
        <h2>Edit Profile</h2>

        <AvatarSection>
          <InputContainer>
            <AvatarUploadWrapper>
              <AvatarUploadButton>
                <input
                  type="file"
                  ref={inputFileRef}
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
                <button
                  type="button"
                  onClick={handleAvatarChangeClick}
                  style={{
                    color: `${watch('avatarUrl')?.name ? 'white' : ''}`,
                  }}
                >
                  {avatarPath || watch()?.avatarUrl?.name || 'Add your avatar'}
                </button>
              </AvatarUploadButton>

              {avatarPreview && (
                <DeleteAvatarButton
                  type="button"
                  onClick={handleDeleteAvatar}
                  aria-label="Remove avatar"
                >
                  <TrashSimple size={18} />
                </DeleteAvatarButton>
              )}
            </AvatarUploadWrapper>

            {errors.avatarUrl && (
              <FormErrors error={errors.avatarUrl.message} />
            )}
          </InputContainer>
          <AvatarUploadPreview
            avatarPreview={avatarPreview}
            defaultImage={AvatarDefaultImage.src}
            onClick={handleAvatarChangeClick}
          />
        </AvatarSection>

        <InputContainer>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input placeholder="Name" {...field} />}
          />
          {errors.name && (
            <FormErrors error={errors.name.message && 'Name is required.'} />
          )}
        </InputContainer>

        <InputContainer>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input placeholder="Email Address" {...field} />
            )}
          />
          {errors.email && <FormErrors error={errors.email.message} />}
        </InputContainer>

        {changePassword && (
          <>
            <InputContainer>
              <Controller
                name="oldPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    placeholder="Current Password"
                    {...field}
                  />
                )}
              />
              {errors.oldPassword && (
                <FormErrors
                  error={
                    errors.oldPassword.message &&
                    'Password must be at least 8 characters'
                  }
                />
              )}
            </InputContainer>

            <InputContainer>
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    placeholder="New Password"
                    {...field}
                  />
                )}
              />
              {errors.newPassword && (
                <FormErrors
                  error={
                    errors.newPassword.message &&
                    'New password must be at least 8 characters'
                  }
                />
              )}
            </InputContainer>
          </>
        )}

        <InputContainer>
          <Checkbox
            label="Change password?"
            checked={changePassword}
            onChange={() => setChangePassword(!changePassword)}
          />
        </InputContainer>

        <Button
          type="submit"
          content="Edit profile"
          isSubmitting={isSubmitting || isLoading}
          style={{
            marginTop: '1rem',
          }}
        />
      </Form>
    </>
  )
}
