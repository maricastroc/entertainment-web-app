import { StyledButton } from './styles'
import { ReactNode, ButtonHTMLAttributes } from 'react'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string | undefined
  icon?: ReactNode
  isSubmitting?: boolean
  hasRoundedBorder?: boolean
  isDisabled?: boolean
}

export const CustomButton = ({
  content,
  icon,
  isSubmitting = false,
  hasRoundedBorder = true,
  isDisabled = false,
  ...props
}: CustomButtonProps) => {
  return (
    <StyledButton
      disabled={isSubmitting || isDisabled}
      className={hasRoundedBorder ? 'rounded' : ''}
      {...props}
    >
      {icon}
      {isSubmitting ? 'Loading...' : content}
    </StyledButton>
  )
}
