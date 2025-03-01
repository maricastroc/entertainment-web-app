/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { Adapter, AdapterUser } from 'next-auth/adapters'
import { prisma } from '@/lib/prisma'

interface CustomUser extends AdapterUser {
  avatarUrl?: string | null
}

interface Account {
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
}

export function PrismaAdapter(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): Adapter {
  return {
    async createUser(user: Omit<CustomUser, 'id'>) {
      const createdUser = await prisma.user.create({
        data: {
          name: user.name!,
          email: user.email,
          avatarUrl: user.avatarUrl,
        },
      })

      return {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email!,
        avatarUrl: createdUser.avatarUrl,
        emailVerified: null,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        emailVerified: null,
        avatarUrl: user.avatarUrl!,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        emailVerified: null,
        avatarUrl: user.avatarUrl!,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) {
        return null
      }

      const { user } = account

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        emailVerified: null,
        avatarUrl: user.avatarUrl!,
      }
    },

    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id!,
        },
        data: {
          name: user.name!,
          email: user.email,
          avatarUrl: user.image,
        },
      })

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email!,
        emailVerified: null,
        avatarUrl: updatedUser.avatarUrl!,
      }
    },

    async linkAccount(account: Account) {
      await prisma.account.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          sessionToken,
          userId,
          expires,
        },
      })

      return {
        sessionToken,
        userId,
        expires,
      }
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          sessionToken,
        },
        include: {
          user: true,
        },
      })
      if (!prismaSession) {
        return null
      }

      const { user, ...session } = prismaSession

      return {
        session: {
          userId: session.userId,
          expires: session.expires,
          sessionToken: session.sessionToken,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email!,
          emailVerified: null,
          avatarUrl: user.avatarUrl,
        },
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const updatedSession = await prisma.session.update({
        where: {
          sessionToken,
        },
        data: {
          expires,
          userId,
        },
      })

      return {
        sessionToken: updatedSession.sessionToken,
        userId: updatedSession.userId,
        expires: updatedSession.expires,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          sessionToken,
        },
      })
    },
  }
}
