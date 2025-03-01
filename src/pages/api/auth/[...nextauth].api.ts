/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth, { NextAuthOptions, User } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
import { NextApiRequest, NextPageContext, NextApiResponse } from 'next'
import { PrismaAdapter } from '@/lib/auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),
    session: {
      strategy: 'jwt',
    },
    providers: [
      GoogleProvider({
        allowDangerousEmailAccountLinking: true,
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
            scope: 'profile email',
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            emailVerified: profile.email_verified,
            avatarUrl: profile.picture,
          }
        },
      }),
      GithubProvider({
        allowDangerousEmailAccountLinking: true,
        clientId: process.env.GITHUB_ID ?? '',
        clientSecret: process.env.GITHUB_SECRET ?? '',
        profile(profile: GithubProfile) {
          return {
            id: profile.id.toString(),
            name: profile.name!,
            email: profile.email!,
            avatarUrl: profile.avatar_url,
          }
        },
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          })

          if (!user) {
            throw new Error('Incorrect email or password.')
          }

          const isPasswordValid = await bcrypt.compare(
            credentials?.password ?? '',
            user.password ?? '',
          )

          if (!isPasswordValid) {
            throw new Error('Incorrect email or password.')
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id
          token.name = user.name
          token.email = user.email
          token.avatarUrl = (user as User & { avatarUrl: string }).avatarUrl
        }
        return token
      },
      async session({ session, token }) {
        if (token) {
          session.user = {
            id: token.id as string,
            name: token.name as string,
            email: token.email as string,
            avatarUrl: token.avatarUrl as string,
          }
        }
        return session
      },
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, buildNextAuthOptions(req, res))
}
