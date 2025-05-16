import { GenresProps } from './genres'
import { SpokenLanguagesProps } from './spoken-languages'

export interface MediaDetailsProps {
  id: string
  original_title: string
  overview: string
  name: string
  title?: string
  tagline: string
  poster_path: string
  vote_average: number
  number_of_episodes?: number
  runtime: number
  release_date: string
  first_air_date?: string
  backdrop_path?: string
  profile_path?: string
  media_type: string
  vote_count?: number
  last_air_date?: string
  spoken_languages: SpokenLanguagesProps[]
  status: string
  genres: GenresProps[]
  homepage: string
  imdb_id: string
  original_language: string
}
