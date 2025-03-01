import { convertLanguageCodeToName } from '@/utils/convertLanguageCodeToName'
import { DetailProps } from '../..'
import { GeneralInfoContainer, GeneralInfoItem } from './styles'

interface Props {
  media: string
  mediaData: {
    detail: DetailProps
  }
}

export function GeneralInfoSection({ media, mediaData }: Props) {
  return (
    <GeneralInfoContainer>
      {media === 'tv' && (
        <GeneralInfoItem>
          <h2>Episodes</h2>
          <p>{`${mediaData?.detail?.number_of_episodes}`}</p>
        </GeneralInfoItem>
      )}
      {media === 'movie' && (
        <GeneralInfoItem>
          <h2>Length</h2>
          <p>{`${mediaData?.detail?.runtime}min.`}</p>
        </GeneralInfoItem>
      )}
      <GeneralInfoItem>
        <h2>Language</h2>
        <p>
          {convertLanguageCodeToName(mediaData?.detail?.original_language) ||
            '-'}
        </p>
      </GeneralInfoItem>
      <GeneralInfoItem>
        <h2>Year</h2>
        {media === 'movie' ? (
          <p>{mediaData?.detail?.release_date?.split('-')[0]}</p>
        ) : (
          <p>{mediaData?.detail?.last_air_date?.split('-')[0]}</p>
        )}
      </GeneralInfoItem>
      <GeneralInfoItem>
        <h2>Status</h2>
        <p>{mediaData?.detail?.status?.split(' ')[0]}</p>
      </GeneralInfoItem>
    </GeneralInfoContainer>
  )
}
