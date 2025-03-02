import { StyledButton } from './styles'
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string | undefined
  isSubmitting?: boolean
  hasRoundedBorder?: boolean
  isDisabled?: boolean
}

export const Button = ({
  content,
  isSubmitting = false,
  hasRoundedBorder = true,
  isDisabled = false,
  ...props
}: Props) => {
  return (
    <StyledButton
      disabled={isSubmitting || isDisabled}
      className={hasRoundedBorder ? 'rounded' : ''}
      {...props}
    >
      {isSubmitting ? 'Loading...' : content}
    </StyledButton>
  )
}
