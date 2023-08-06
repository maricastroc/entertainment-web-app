import { styled, keyframes } from '../../styles'

const rotateAnimation = keyframes({
  '0%': { transform: 'rotate(0deg) scale(0.8)' },
  '50%': { transform: 'rotate(360deg) scale(1.2)' },
  '100%': { transform: 'rotate(720deg) scale(0.8)' },
})

const ball1Animation = keyframes({
  '0%': { boxShadow: '30px 0 0 #f8b334' },
  '50%': {
    boxShadow: '0 0 0 #f8b334',
    marginBottom: '0',
    transform: 'translate(15px, 15px)',
  },
  '100%': { boxShadow: '30px 0 0 #f8b334', marginBottom: '10px' },
})

const ball2Animation = keyframes({
  '0%': { boxShadow: '30px 0 0 #97bf0d' },
  '50%': {
    boxShadow: '0 0 0 #97bf0d',
    marginTop: '-20px',
    transform: 'translate(15px, 15px)',
  },
  '100%': { boxShadow: '30px 0 0 #97bf0d', marginTop: '0' },
})

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1.5rem',
})

export const Loader = styled('div', {
  animation: `${rotateAnimation} 1s infinite`,
  height: '50px',
  width: '50px',

  '&::before, &::after': {
    borderRadius: '50%',
    content: '""',
    display: 'block',
    height: '20px',
    width: '20px',
  },

  '&::before': {
    animation: `${ball1Animation} 1s infinite`,
    backgroundColor: '#cb2025',
    boxShadow: '30px 0 0 #f8b334',
    marginBottom: '10px',
  },

  '&::after': {
    animation: `${ball2Animation} 1s infinite`,
    backgroundColor: '#00a096',
    boxShadow: '30px 0 0 #97bf0d',
  },
})
