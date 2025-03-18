import { StyledInputContainer } from './styles'
import { ReactNode } from 'react'

interface InputContainerProps {
  children: ReactNode
}

export const InputContainer = ({ children }: InputContainerProps) => {
  return <StyledInputContainer>{children}</StyledInputContainer>
}
