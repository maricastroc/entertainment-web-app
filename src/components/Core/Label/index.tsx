import { StyledLabel } from './styles'

export const CustomLabel = ({
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return <StyledLabel {...props} />
}
