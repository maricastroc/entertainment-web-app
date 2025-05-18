import { AccountProps } from './account'
import { MediaDetailsProps } from './media-details'
import { SessionProps } from './session'

export interface UserProps {
  id: string
  name: string
  avatarUrl?: string | null
  createdAt?: Date
  password?: string | null
  email?: string
  savedMovies: MediaDetailsProps[]
  savedSeries: MediaDetailsProps[]

  accounts?: AccountProps[] | null
  sessions?: SessionProps[] | null
}
