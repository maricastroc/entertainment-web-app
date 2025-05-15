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

interface Props {
  personData: PersonDataProps
}

export function DetailsSection({ personData }: Props) {
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
      </PersonDetailsWrapper>
    </PersonDetails>
  )
}
