import { ErrorContainer, StyledFormErrors } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

interface FormErrorsProps {
  error: string | undefined | null
}

export const FormErrors = ({ error }: FormErrorsProps) => {
  return (
    error && (
      <StyledFormErrors>
        <ErrorContainer>
          <FontAwesomeIcon icon={faCircleXmark} />
          <p>{error}</p>
        </ErrorContainer>
      </StyledFormErrors>
    )
  )
}
