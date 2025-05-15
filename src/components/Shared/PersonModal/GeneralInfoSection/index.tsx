import { GeneralInfoContainer, GeneralInfoItem } from './styles'
import { PersonDataProps } from '@/types/person-data'

interface Props {
  personData: PersonDataProps
}

export function GeneralInfoSection({ personData }: Props) {
  return (
    <GeneralInfoContainer>
      {personData?.birthday && (
        <GeneralInfoItem>
          <h2>Birthdate</h2>
          <p>
            {personData?.birthday
              ? new Date(personData.birthday).toLocaleDateString('en-US')
              : '-'}
          </p>
        </GeneralInfoItem>
      )}

      {personData?.place_of_birth && (
        <GeneralInfoItem>
          <h2>Birthplace</h2>
          <p>
            {(() => {
              const parts = personData.place_of_birth
                .split(',')
                .map((s) => s.trim())
              const state = parts[1] || ''
              const country = parts[2] || ''
              return `${state} (${country})`
            })()}
          </p>
        </GeneralInfoItem>
      )}

      {personData?.known_for_department && (
        <GeneralInfoItem>
          <h2>Department</h2>
          <p>{personData?.known_for_department}</p>
        </GeneralInfoItem>
      )}
    </GeneralInfoContainer>
  )
}
