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
  }
  content: string
  url: string
  created_at: string | Date
  updated_at: string | Date
}
