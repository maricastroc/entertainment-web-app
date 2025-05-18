import { InputHTMLAttributes, useState } from 'react'
import { StyledInput, InputContainer, ToggleButton } from './styles'
import { Eye, EyeSlash } from 'phosphor-react'

export const Input = ({
  type,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <InputContainer>
      <StyledInput
        type={type === 'password' && showPassword ? 'text' : type}
        {...props}
      />
      {type === 'password' && (
        <ToggleButton type="button" onClick={togglePasswordVisibility}>
          {showPassword ? <Eye size={16} /> : <EyeSlash size={16} />}
        </ToggleButton>
      )}
    </InputContainer>
  )
}
