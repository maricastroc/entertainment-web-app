import { StyledButton } from './styles'
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string | undefined
  isSubmitting?: boolean
  hasRoundedBorder?: boolean
  isDisabled?: boolean
  variant?: 'default' | 'outline-white' | 'solid-white'
}

export const Button = ({
  content,
  isSubmitting = false,
  hasRoundedBorder = true,
  isDisabled = false,
  variant = 'default',
  ...props
}: Props) => {
  return (
    <StyledButton
      disabled={isSubmitting || isDisabled}
      className={hasRoundedBorder ? 'rounded' : ''}
      variant={variant}
      {...props}
    >
      {isSubmitting ? 'Loading...' : content}
    </StyledButton>
  )
}
