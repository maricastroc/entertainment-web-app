import { styled, keyframes } from '@/styles'

const rotateAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '50%': {
    transform: 'rotate(-2deg)',
  },
  '100%': {
    transform: 'rotate(0deg)',
  },
})

export const Container = styled('div', {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  textAlign: 'center',
  borderRadius: 8,
  height: '11rem',

  '&.isEvenTv': {
    backgroundColor: '$green500',
  },

  '&.isEvenMovie': {
    backgroundColor: '$blue500',
  },

  '&.notEven': {
    backgroundColor: '$blue700',
  },

  p: {
    color: '$white',
    fontSize: '1.2rem',
    textAlign: 'center',
    textDecoration: 'none',
    fontWeight: 500,
  },

  '&:hover': {
    animation: `${rotateAnimation} 0.3s forwards`,
  },
})
