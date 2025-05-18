import React, { ReactNode, FormHTMLAttributes } from 'react'
import { StyledForm } from './styles'

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
  isLarger?: boolean
}

export const Form = ({ children, isLarger = false, ...props }: Props) => {
  return (
    <StyledForm isLarger={isLarger} {...props}>
      {children}
    </StyledForm>
  )
}
