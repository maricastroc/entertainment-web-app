import { styled } from '@/styles'

export const StyledInput = styled('input', {
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: 'solid 1px $blue600',
  color: '$gray100',
  padding: '0.75rem 0.6rem',
  fontSize: '$bodyMd',
  width: '100%',

  '&::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',
  },

  '&:focus': {
    backgroundColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
  },
})

export const InputContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
})

export const ToggleButton = styled('button', {
  position: 'absolute',
  right: '0.5rem',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '$gray100',
  padding: '0.25rem',

  '&:focus': {
    outline: 'none',
  },
})
