import {
  Header,
  Container,
  Content,
  UserInfoContainer,
  UserInfoData,
} from './styles'
import { ReviewProps } from '@/types/review'
import { convertRatingTo5Scale } from '@/utils/convertRatingTo5Scale'
import { StarsRating } from '@/components/Shared/StarsRating'
import { Avatar } from '@/components/Core/Avatar'
import { formatDistanceToNow } from 'date-fns'

interface Props {
  review: ReviewProps
  avatarUrl: string
}

export function ReviewCard({ avatarUrl, review }: Props) {
  return (
    <Container>
      <Header>
        <UserInfoContainer>
          <Avatar
            avatarUrl={
              review?.author_details?.avatar_user_path
                ? review?.author_details?.avatar_user_path
                : avatarUrl
            }
          />
          <UserInfoData>
            <p>{review?.author_details?.name || review?.author}</p>
            <span>
              {formatDistanceToNow(new Date(review?.created_at), {
                addSuffix: true,
              })}
            </span>
          </UserInfoData>
        </UserInfoContainer>
        <StarsRating
          isSmaller
          rating={
            review?.is_from_app_user
              ? review?.author_details?.rating
              : convertRatingTo5Scale(review?.author_details?.rating)
          }
        />
      </Header>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: review?.content }} />
      </Content>
    </Container>
  )
}
