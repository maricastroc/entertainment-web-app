import { TrendUp } from 'phosphor-react'
import { GeneralInfoSection } from '../GeneralInfoSection'
import {
  Heading,
  PersonDetailsWrapper,
  PersonDetails,
  PopularityWrapper,
  PopularityValue,
  Separator,
} from './styles'
import { PersonDataProps } from '@/types/person-data'
import { PersonSocialDataProps } from '@/types/person-social-media'
import { SocialDataSection } from '../SocialDataSection'

interface Props {
  personData: PersonDataProps
  socialData: PersonSocialDataProps | null
}

export function DetailsSection({ personData, socialData }: Props) {
  return (
    <PersonDetails>
      <Heading>
        <h2>{personData?.name || 'N/A'}</h2>
      </Heading>

      <PersonDetailsWrapper>
        <Separator />

        <PopularityWrapper>
          <TrendUp size={48} />
          <PopularityValue>
            <span>{personData?.popularity}</span>
            <p>Popularity</p>
          </PopularityValue>
        </PopularityWrapper>

        <Separator />
        <GeneralInfoSection personData={personData} />

        {socialData && (
          <>
            <Separator />
            <SocialDataSection socialData={socialData} />
          </>
        )}
      </PersonDetailsWrapper>
    </PersonDetails>
  )
}
