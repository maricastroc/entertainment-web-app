import { MediaDetailsProps } from './media-details'

export interface ReviewDataProps {
  id: string
  page: number
  results: MediaDetailsProps[]
  total_pages: number
  total_results: number
}
