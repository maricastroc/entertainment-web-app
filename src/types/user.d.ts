import { AccountProps } from './account'
import { SessionProps } from './session'

export interface UserProps {
  id: string
  name: string
  avatarUrl?: string | null
  createdAt?: Date
  password?: string | null
  email?: string
  savedMovies: { id: string }[]
  savedSeries: { id: string }[]

  accounts?: AccountProps[] | null
  sessions?: SessionProps[] | null
}
