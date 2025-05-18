/* eslint-disable react-hooks/exhaustive-deps */
import { pathToSearchAll } from '@/utils'
import { NextSeo } from 'next-seo'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { useEffect, useRef, useState } from 'react'
import AuthLayout from '@/layouts/auth'
import { InputContainer } from '@/components/Core/InputContainer'
import {
  AvatarPreview,
  AvatarPreviewWrapper,
  AvatarSection,
  AvatarUploadButton,
  Container,
  FormWrapper,
} from './styles'
import { Form } from '@/components/Core/Form'
import { FormErrors } from '@/components/Core/FormErrors'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Core/Input'
import { Button } from '@/components/Core/Button'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import { handleApiError } from '@/utils/handleApiError'
import { Checkbox } from '@/components/Core/Checkbox'
import { useAppContext } from '@/contexts/AppContext'

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

export default function Profile() {
  const isRouteLoading = useLoadingOnRouteChange()

  const [changePassword, setChangePassword] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [isClient, setIsClient] = useState(false)

  const inputFileRef = useRef<HTMLInputElement>(null)

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const { user, handleSetUser } = useAppContext()

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
        setIsLoading(true)

        await api.put(`/user/edit/${data?.userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        toast.success('User successfully updated!')

        handleSetUser({
          ...user,
          name: data.name,
          email: data.email,
          avatarUrl: avatarPreview || user.avatarUrl,
        })
      } catch (error) {
        handleApiError(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setValue('avatarUrl', file)

      const reader = new FileReader()
      reader.onload = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarChangeClick = () => {
    inputFileRef.current?.click()
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (user) {
      setValue('email', user.email)
      setValue('name', user.name)
      setValue('userId', user.id as string)

      setAvatarPreview(user?.avatarUrl)
    }
  }, [user])

  return (
    <>
      <NextSeo title="Home | MovieMentor" />
      {isClient && (
        <AuthLayout
          searchPath={pathToSearchAll}
          searchPlaceholder="Search for Movie / Series"
          isLoading={isRouteLoading || isLoading}
          showSearchBar={false}
        >
          <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormWrapper>
                <h2>Edit Profile</h2>

                <AvatarSection>
                  <InputContainer>
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
                        <p>{watch('avatarUrl')?.name || user?.avatarUrl}</p>
                      </button>
                    </AvatarUploadButton>
                    {errors.avatarUrl && (
                      <FormErrors error={errors.avatarUrl.message} />
                    )}
                  </InputContainer>
                  <AvatarPreviewWrapper>
                    <AvatarPreview onClick={handleAvatarChangeClick}>
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Avatar Preview"
                          width={40}
                        />
                      ) : (
                        <p>+ Add</p>
                      )}
                    </AvatarPreview>
                  </AvatarPreviewWrapper>
                </AvatarSection>

                <InputContainer>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Name" {...field} />
                    )}
                  />
                  {errors.name && (
                    <FormErrors
                      error={errors.name.message && 'Name is required.'}
                    />
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
              </FormWrapper>
            </Form>
          </Container>
        </AuthLayout>
      )}
    </>
  )
}
