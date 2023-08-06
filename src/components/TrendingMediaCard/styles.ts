import { styled } from '../../styles'

export const Wrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  width: '15rem',
  height: '8.75rem',

  '@media (min-width: 640px)': {
    width: '28rem',
    height: 'auto',
  },
})

export const Container = styled('div', {
  position: 'relative',
  display: 'flex',
  cursor: 'pointer',
})

export const BackgroundImage = styled('img', {
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: 8,
  opacity: 0.5,
})

export const CardInfo = styled('div', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  left: '6%',
  top: '65%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  maxWidth: '90%',

  '@media (min-width: 640px)': {
    left: '6%',
    top: '72%',
  },
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

  '@media (min-width: 640px)': {
    p: {
      fontSize: '0.93rem',
    },
  },
})

export const CardInfoTitle = styled('h2', {
  fontSize: '0.93rem',
  color: '$gray100',
  fontWeight: 500,
  maxWidth: '100%', // Ajusta a largura do título para ocupar o máximo possível dentro do CardInfo
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  '@media (min-width: 640px)': {
    fontSize: '1.5rem',
  },
})
