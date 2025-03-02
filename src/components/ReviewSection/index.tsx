import {
  Header,
  ReviewCard,
  ReviewContent,
  UserInfoContainer,
  ReviewsContainer,
} from './styles'
import { ReviewProps } from '@/types/review'
import { convertRatingTo5Scale } from '@/utils/convertRatingTo5Scale'
import { StarsRating } from '../StarsRating'
import { Avatar } from '../Core/Avatar'

interface Props {
  results: ReviewProps[] | undefined
}

export function ReviewSection({ results }: Props) {
  return (
    <ReviewsContainer>
      <h2>Reviews</h2>
      {results && results?.length > 0 ? (
        results.map((review) => {
          const avatarUrl = review?.author_details?.avatar_path
            ? review?.author_details?.avatar_path.startsWith('/')
              ? `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
              : review?.author_details?.avatar_path
            : 'https://github.com/octocat.png'

          return (
            <ReviewCard key={review.id}>
              <Header>
                <Avatar avatarUrl={avatarUrl} />
                <UserInfoContainer>
                  <p>{review?.author_details?.name || review?.author}</p>
                  <StarsRating
                    isSmaller
                    rating={convertRatingTo5Scale(
                      review?.author_details?.rating,
                    )}
                  />
                </UserInfoContainer>
              </Header>
              <ReviewContent>
                <div dangerouslySetInnerHTML={{ __html: review?.content }} />
              </ReviewContent>
            </ReviewCard>
          )
        })
      ) : (
        <p>No reviews available.</p>
      )}
    </ReviewsContainer>
  )
}
