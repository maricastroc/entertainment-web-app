export interface ReviewProps {
  id: string
  author: string
  author_details: {
    name: string
    username?: string
    rating: number
    avatar_path?: string
  }
  content: string
  url: string
  created_at: string | Date
  updated_at: string | Date
}
