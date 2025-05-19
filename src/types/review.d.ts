export interface ReviewProps {
  id: string
  is_from_app_user?: boolean
  user_id?: string
  author: string
  author_details: {
    name: string
    username?: string
    rating: number
    avatar_path?: string
    avatar_user_path?: string
    votes?: {
      up: number
      down: number
    }
  }
  content: string
  url: string
  created_at: string | Date
  updated_at: string | Date
  votes?: {
    up: number
    down: number
  }
  updated_votes_up?: number
  updated_votes_down?: number
  mediaPoster?: string
  mediaReleaseDate?: string
  mediaTitle?: string
  rate?: number
  description?: string
  movieId?: number
  seriesId?: number
  media_id: string
  media_type: string
}
