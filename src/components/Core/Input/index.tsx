import { InputHTMLAttributes } from 'react'
import { StyledInput } from './styles'

export const Input = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return <StyledInput {...props} />
}
