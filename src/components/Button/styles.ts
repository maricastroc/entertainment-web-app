import { styled } from '@/styles'

export const StyledButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.7rem',
  cursor: 'pointer',
  color: 'white',
  backgroundColor: '$blue600',
  padding: '0.6rem',
  fontSize: '0.95rem',
  border: '1px solid transparent',
  width: '100%',
  transition: '200ms ease',
  fontWeight: 400,

  svg: {
    color: 'white',
  },

  '&.rounded': {
    borderRadius: 16,
  },

  '&:not(:disabled):hover': {
    filter: 'brightness(1.2)',
  },

  '&:disabled': {
    backgroundColor: '$gray400',
    border: 'solid 1px $gray400',
    color: '$gray100',
    cursor: 'not-allowed !important',
    pointerEvents: 'none',
  },
})
