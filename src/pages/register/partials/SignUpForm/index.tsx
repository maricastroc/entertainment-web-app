import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { handleApiError } from '@/utils/handleApiError'
import { api } from '@/lib/axios'
import { z } from 'zod'

import { InputContainer } from '@/components/Core/InputContainer'
import { FormErrors } from '@/components/Core/FormErrors'
import { Button } from '@/components/Core/Button'
import { Input } from '@/components/Core/Input'
import { LinkButton } from '@/components/Core/LinkButton'
import { Form } from '@/components/Core/Form'

import {
  Wrapper,
  AvatarUploadButton,
  AvatarPreview,
  AvatarSection,
  AvatarPreviewWrapper,
} from './styles'

const signUpFormSchema = z
  .object({
    email: z.string().min(3, { message: 'E-mail is required.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' }),
    passwordConfirm: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' }),
    avatarUrl: z.custom<File>((file) => file instanceof File && file.size > 0, {
      message: 'Avatar file is required.',
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  })

type SignUpFormData = z.infer<typeof signUpFormSchema>

export default function SignUpForm() {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { email: '', password: '' },
  })

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(data: SignUpFormData) {
    const formData = new FormData()

    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('avatarUrl', data.avatarUrl)

    try {
      setIsLoading(true)

      await api.post(`/user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('User successfully registered!')
      router.push('/')
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Set avatar file in form value
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

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <h2>Sign Up</h2>

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
                  {watch('avatarUrl')?.name || 'Add your avatar'}
                </button>
              </AvatarUploadButton>
              {errors.avatarUrl && (
                <FormErrors error={errors.avatarUrl.message} />
              )}
            </InputContainer>
            <AvatarPreviewWrapper>
              <AvatarPreview onClick={handleAvatarChangeClick}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar Preview" width={40} />
                ) : (
                  <p>+ Add</p>
                )}
              </AvatarPreview>
            </AvatarPreviewWrapper>
          </AvatarSection>

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

          <InputContainer>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input type="password" placeholder="Password" {...field} />
              )}
            />
            {errors.password && <FormErrors error={errors.password.message} />}
          </InputContainer>

          <InputContainer>
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="Repeat Password"
                  {...field}
                />
              )}
            />
            {errors.passwordConfirm && (
              <FormErrors error={errors.passwordConfirm.message} />
            )}
          </InputContainer>

          <Button
            type="submit"
            content="Create your account"
            isSubmitting={isSubmitting || isLoading}
            style={{
              marginTop: '1rem',
            }}
          />

          <LinkButton
            type="button"
            onClick={() => {
              router.push('/')
            }}
          >
            Already have an account? <span>Login</span>
          </LinkButton>
        </Wrapper>
      </Form>
    </>
  )
}
