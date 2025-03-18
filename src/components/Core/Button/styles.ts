import { styled } from '@/styles'

export const StyledButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.7rem',
  cursor: 'pointer',
  color: 'white',
  backgroundColor: '$red300',
  padding: '0.875rem 0.6rem',
  fontSize: '$bodyMd',
  border: '1px solid transparent',
  width: '100%',
  transition: '200ms ease',
  borderRadius: 8,

  svg: {
    color: 'white',
  },

  '&:not(:disabled):hover': {
    color: '$blue800',
    backgroundColor: '$white',
  },

  '&:disabled': {
    backgroundColor: '$blue600',
    border: 'solid 1px $blue600',
    color: '$gray100',
    cursor: 'not-allowed !important',
    pointerEvents: 'none',
  },
})
