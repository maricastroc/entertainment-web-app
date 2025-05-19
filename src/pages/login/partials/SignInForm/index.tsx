import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { RocketLaunch } from 'phosphor-react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputContainer } from '@/components/Core/InputContainer'
import { FormErrors } from '@/components/Core/FormErrors'
import { Button } from '@/components/Core/Button'
import { Input } from '@/components/Core/Input'
import { Form } from '@/components/Core/Form'
import { LinkButton } from '@/components/Core/LinkButton'

import {
  Divider,
  AuthContainer,
  AuthOptions,
  AuthItem,
  VerticalDivider,
  Wrapper,
} from './styles'

const signInFormSchema = z.object({
  email: z.string().min(3, { message: 'E-mail is required.' }),
  password: z.string().min(3, { message: 'Password is required.' }),
})

type SignInFormData = z.infer<typeof signInFormSchema>

interface SignInFormProps {
  onClose?: () => void
}

export default function SignInForm({ onClose }: SignInFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: '', password: '' },
  })

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  async function handleSignIn(provider: string) {
    setIsLoading(true)

    if (provider === 'google') {
      await signIn('google', { callbackUrl: '/home' })
    } else if (provider === 'github') {
      await signIn('github', { callbackUrl: '/home' })
    } else router.push('/home')

    setIsLoading(false)

    if (onClose) {
      onClose()
    }
  }

  async function onSubmit(data: SignInFormData) {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error(result?.error)
      } else {
        toast.success('Welcome to the Movie Mentor!')
        router.push('/home')
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.')
      console.error(error)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <h2>Login</h2>
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

          <Button
            type="submit"
            content="Login to your account"
            isSubmitting={isSubmitting || isLoading}
            style={{
              marginTop: '1rem',
            }}
          />

          <LinkButton
            type="button"
            onClick={() => {
              router.push('/register')
            }}
          >
            Don&apos;t have an account? <span>Sign up</span>
          </LinkButton>
        </Wrapper>
        <Divider />

        <AuthContainer>
          <p>Or login with:</p>
          <AuthOptions>
            <AuthItem type="button" onClick={() => handleSignIn('google')}>
              <Icon icon="flat-color-icons:google" fontSize={24} />
              <p>Google</p>
            </AuthItem>

            <VerticalDivider />
            <AuthItem type="button" onClick={() => handleSignIn('github')}>
              <Icon
                icon="ant-design:github-outlined"
                color="white"
                fontSize={24}
              />
              <p>Github</p>
            </AuthItem>

            <VerticalDivider />
            <AuthItem type="button" onClick={() => router.push('/home')}>
              {<RocketLaunch size={24} />}
              <p>Guest</p>
            </AuthItem>
          </AuthOptions>
        </AuthContainer>
      </Form>
    </>
  )
}
