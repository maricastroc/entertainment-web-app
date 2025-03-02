import { StarsRating } from '@/components/StarsRating'
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
import { DetailProps } from '../..'
import { convertRatingTo5Scale } from '@/utils/convertRatingTo5Scale'

interface Props {
  media: string
  mediaData: {
    detail: DetailProps
  }
}

export function DetailsSection({ media, mediaData }: Props) {
  return (
    <MovieDetails>
      <Heading>
        <h2>
          {mediaData?.detail?.original_title ||
            mediaData?.detail?.name ||
            'N/A'}
        </h2>
        <p>{mediaData?.detail?.tagline}</p>
      </Heading>
      <Separator />
      <MovieDetailsWrapper>
        {mediaData?.detail?.vote_average && (
          <RatingContainer>
            <p>
              {convertRatingTo5Scale(mediaData?.detail?.vote_average).toFixed(
                2,
              )}
            </p>
            <RatingWrapper>
              <StarsRating
                rating={convertRatingTo5Scale(mediaData?.detail?.vote_average)}
              />
              <span>({mediaData?.detail?.vote_count} ratings)</span>
            </RatingWrapper>
          </RatingContainer>
        )}
        <Separator />
        <GeneralInfoSection media={media} mediaData={mediaData} />
        <Separator />
        <GenresContainer>
          <h2>Genres</h2>
          <GenresContent>
            {mediaData?.detail?.genres?.length > 0 &&
              mediaData?.detail?.genres?.map((genre) => {
                return <GenreItem key={genre.id}>{genre.name}</GenreItem>
              })}
          </GenresContent>
        </GenresContainer>
      </MovieDetailsWrapper>
    </MovieDetails>
  )
}
