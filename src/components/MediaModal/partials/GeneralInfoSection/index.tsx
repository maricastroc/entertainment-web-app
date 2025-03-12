import { convertLanguageCodeToName } from '@/utils/convertLanguageCodeToName'
import { GeneralInfoContainer, GeneralInfoItem } from './styles'
import { MediaDetailsProps } from '@/types/media-details'

interface Props {
  media: string
  mediaData: MediaDetailsProps
}

export function GeneralInfoSection({ media, mediaData }: Props) {
  return (
    <GeneralInfoContainer>
      {media === 'tv' && mediaData?.number_of_episodes && (
        <GeneralInfoItem>
          <h2>Episodes</h2>
          <p>{`${mediaData?.number_of_episodes}`}</p>
        </GeneralInfoItem>
      )}

      {media === 'movie' && mediaData?.runtime > 0 && (
        <GeneralInfoItem>
          <h2>Length</h2>
          <p>{`${mediaData?.runtime}min.`}</p>
        </GeneralInfoItem>
      )}

      {mediaData?.original_language && (
        <GeneralInfoItem>
          <h2>Language</h2>
          <p>
            {convertLanguageCodeToName(mediaData?.original_language) || '-'}
          </p>
        </GeneralInfoItem>
      )}

      {(mediaData?.release_date || mediaData?.last_air_date) && (
        <GeneralInfoItem>
          <h2>Year</h2>
          {media === 'movie' ? (
            <p>{mediaData?.release_date?.split('-')[0]}</p>
          ) : (
            <p>{mediaData?.last_air_date?.split('-')[0]}</p>
          )}
        </GeneralInfoItem>
      )}

      {mediaData?.status && (
        <GeneralInfoItem>
          <h2>Status</h2>
          <p>{mediaData?.status?.split(' ')[0]}</p>
        </GeneralInfoItem>
      )}
    </GeneralInfoContainer>
  )
}
