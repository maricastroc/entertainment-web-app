import { styled } from '@/styles'

export const StyledInput = styled('input', {
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: 'solid 1px $blue600',
  color: '$gray100',
  padding: '0.75rem 0.6rem',
  fontSize: '$bodyMd',

  '&::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',
  },

  '&:focus': {
    backgroundColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
  },
})
