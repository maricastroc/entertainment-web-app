import { StarsRating } from '@/components/Shared/StarsRating'
import {
  GenreItem,
  GenresContent,
  GenresContainer,
  Heading,
  MovieDetails,
  MovieDetailsWrapper,
  RatingContainer,
  Separator,
  RatingWrapper,
} from './styles'
import { GeneralInfoSection } from '../GeneralInfoSection'
import { convertRatingTo5Scale } from '@/utils/convertRatingTo5Scale'
import { MediaDetailsProps } from '@/types/media-details'

interface Props {
  media: string
  mediaData: MediaDetailsProps
}

export function DetailsSection({ media, mediaData }: Props) {
  return (
    <MovieDetails>
      <Heading>
        <h2>{mediaData?.original_title || mediaData?.name || 'N/A'}</h2>
        <p>{mediaData?.tagline}</p>
      </Heading>
      <Separator />
      <MovieDetailsWrapper>
        <RatingContainer>
          <p>{convertRatingTo5Scale(mediaData?.vote_average).toFixed(2)}</p>
          <RatingWrapper>
            <StarsRating
              rating={convertRatingTo5Scale(mediaData?.vote_average)}
            />
            <span>({mediaData?.vote_count} ratings)</span>
          </RatingWrapper>
        </RatingContainer>
        <Separator />
        <GeneralInfoSection media={media} mediaData={mediaData} />
        <Separator />
        <GenresContainer>
          <h2>Genres</h2>
          <GenresContent>
            {mediaData?.genres?.length > 0 &&
              mediaData?.genres?.map((genre) => {
                return <GenreItem key={genre.id}>{genre.name}</GenreItem>
              })}
          </GenresContent>
        </GenresContainer>
      </MovieDetailsWrapper>
    </MovieDetails>
  )
}
