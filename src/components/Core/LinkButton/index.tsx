import { StyledLinkButton } from './styles'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const LinkButton = ({ children, ...props }: Props) => {
  return <StyledLinkButton {...props}>{children}</StyledLinkButton>
}
