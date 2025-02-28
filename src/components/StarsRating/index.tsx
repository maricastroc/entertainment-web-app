import { Star, StarHalf } from 'phosphor-react'
import { Rating } from './styles'

interface StarsRatingProps {
  rating: number
  isSmaller?: boolean
}

export function StarsRating({ rating, isSmaller = false }: StarsRatingProps) {
  return (
    <Rating size={isSmaller ? 'smaller' : undefined}>
      {Array.from({ length: 5 }).map((_, i) => {
        return rating < i + 1 && rating > i ? (
          <StarHalf key={i} weight="fill" />
        ) : (
          <Star key={i} weight={rating >= i + 1 ? 'fill' : undefined} />
        )
      })}
    </Rating>
  )
}
