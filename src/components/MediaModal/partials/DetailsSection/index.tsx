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
        <h2>{mediaData?.detail?.original_title || mediaData?.detail?.name}</h2>
        <p>{mediaData?.detail?.tagline}</p>
      </Heading>
      <Separator />
      <MovieDetailsWrapper>
        <RatingContainer>
          <h2>
            {convertRatingTo5Scale(mediaData?.detail?.vote_average).toFixed(2)}
          </h2>
          <StarsRating
            rating={convertRatingTo5Scale(mediaData?.detail?.vote_average)}
          />
        </RatingContainer>
        <Separator />
        <GeneralInfoSection media={media} mediaData={mediaData} />
        <Separator />
        <GenresContainer>
          <h2>Genres</h2>
          <GenresContent>
            {mediaData?.detail?.genres?.length > 0 ? (
              mediaData?.detail?.genres?.map((genre) => {
                return <GenreItem key={genre.id}>{genre.name}</GenreItem>
              })
            ) : (
              <p>N/A</p>
            )}
          </GenresContent>
        </GenresContainer>
      </MovieDetailsWrapper>
    </MovieDetails>
  )
}
