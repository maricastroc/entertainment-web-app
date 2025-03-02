import React, { ReactNode, FormHTMLAttributes } from 'react'
import { StyledForm } from './styles'

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export const Form = React.forwardRef<HTMLFormElement, Props>(
  ({ children, ...props }: Props, ref) => {
    return (
      <StyledForm ref={ref} {...props}>
        {children}
      </StyledForm>
    )
  },
)

Form.displayName = 'Form'
