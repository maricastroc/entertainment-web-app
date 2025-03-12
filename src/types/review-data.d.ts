import { ReviewProps } from './review'

export interface ReviewDataProps {
  id: string
  page: number
  results: ReviewProps[]
  total_pages: number
  total_results: number
}
