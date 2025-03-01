import { UserProps } from './user'

export interface SessionProps {
  id: string
  sessionToken: string
  userId: string
  expires: Date
  user?: UserProps
}
