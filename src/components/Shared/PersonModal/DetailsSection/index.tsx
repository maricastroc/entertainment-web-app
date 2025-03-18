import { Heading, MovieDetails, Separator, BiographyContainer } from './styles'
import { PersonDataProps } from '@/types/person-data'

interface Props {
  personData: PersonDataProps
}

export function DetailsSection({ personData }: Props) {
  function formatText(text: string) {
    const paragraphs = text.trim().split('\n\n')
    return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
  }
  console.log(personData)
  return (
    <MovieDetails>
      <Heading>
        <h2>{personData?.name || 'N/A'}</h2>
      </Heading>
      <Separator />
      <BiographyContainer>
        {formatText(personData?.biography || 'No biography available.')}
      </BiographyContainer>
    </MovieDetails>
  )
}
