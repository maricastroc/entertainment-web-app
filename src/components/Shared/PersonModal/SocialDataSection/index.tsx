import { PersonSocialDataProps } from '@/types/person-social-media'
import { SocialIconLink, SocialIconsContainer } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faImdb,
  faInstagram,
  faTiktok,
  faTwitter,
  faWikipediaW,
} from '@fortawesome/free-brands-svg-icons'

interface Props {
  socialData: PersonSocialDataProps
}

export function SocialDataSection({ socialData }: Props) {
  return (
    <SocialIconsContainer>
      {socialData.facebook_id && socialData?.facebook_id?.length > 0 && (
        <SocialIconLink
          href={`https://facebook.com/${socialData.facebook_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </SocialIconLink>
      )}

      {socialData.twitter_id && socialData?.twitter_id?.length > 0 && (
        <SocialIconLink
          href={`https://twitter.com/${socialData.twitter_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </SocialIconLink>
      )}

      {socialData.instagram_id && socialData?.instagram_id?.length > 0 && (
        <SocialIconLink
          href={`https://instagram.com/${socialData.instagram_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </SocialIconLink>
      )}

      {socialData.tiktok_id && socialData?.tiktok_id?.length > 0 && (
        <SocialIconLink
          href={`https://tiktok.com/@${socialData.tiktok_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTiktok} />
        </SocialIconLink>
      )}

      {socialData?.imdb_id && socialData?.imdb_id?.length > 0 && (
        <SocialIconLink
          href={`https://www.imdb.com/name/${socialData.imdb_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faImdb} />
        </SocialIconLink>
      )}

      {socialData?.wikidata_id && socialData?.wikidata_id?.length > 0 && (
        <SocialIconLink
          href={`https://www.wikidata.org/wiki/${socialData.wikidata_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faWikipediaW} />
        </SocialIconLink>
      )}
    </SocialIconsContainer>
  )
}
