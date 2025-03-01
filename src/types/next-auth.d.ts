/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface UserProps {
    id: string | number
    name: string
    email: string
    avatarUrl: string
  }

  interface Session {
    user: UserProps
  }
}
