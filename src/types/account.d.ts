export interface AccountProps {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refreshToken?: string
  accessToken?: string
  expiresAt?: number
  tokenType?: string
  scope?: string
  idToken?: string
  sessionState?: string

  user?: UserProps
}
