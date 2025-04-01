import { SimilarCardProps } from '@/components/Shared/SimilarCard'
import { MediaDetailsProps } from './media-details'
import { ReviewDataProps } from './review-data'
import { CastProps } from './cast'

export interface MediaResultProps {
  detail: MediaDetailsProps
  similars: {
    results: SimilarCardProps[]
  }
  videos: {
    results: SimilarCardProps[]
  }
  reviews: ReviewDataProps
  credits: {
    cast: CastProps[]
    crew: CrewProps[]
  }
}
