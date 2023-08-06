import { keyframes, styled } from '../../styles'

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
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.5rem',
  width: '100%',
  minWidth: '5rem',

  '&:hover': {
    animation: `${rotateAnimation} 0.3s forwards`,
  },
})

export const BackgroundImage = styled('img', {
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: 8,
  objectFit: 'cover',
  maxHeight: 140,
})

export const NotFoundImage = styled('img', {
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: 8,
  filter: 'blur(2px)',
  objectFit: 'cover',
  maxHeight: 140,
})

export const CardInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  maxWidth: '90%',
})

export const CardInfoData = styled('div', {
  display: 'flex',
  alignItems: 'center',

  p: {
    color: '$gray300',
    fontSize: '0.75rem',
    fontWeight: 300,

    svg: {
      color: '$gray300',
      fontSize: '0.75rem',
      marginRight: '0.4rem',
    },
  },

  span: {
    color: '$gray300',
    margin: '0 0.5rem',
  },

  '@media (min-width: 768px)': {
    p: {
      fontSize: '0.81rem',
    },
  },
})

export const CardInfoTitle = styled('h2', {
  fontSize: '0.93rem',
  color: '$gray100',
  fontWeight: 500,
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  '@media (min-width: 768px)': {
    fontSize: '1.125rem',
  },
})
