import { StyledFormErrors } from './styles'

interface FormErrorsProps {
  error: string | undefined | null
}

export const FormErrors = ({ error }: FormErrorsProps) => {
  return <StyledFormErrors>{error && <span>{error}</span>}</StyledFormErrors>
}
