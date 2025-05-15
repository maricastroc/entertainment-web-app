import { styled } from '@/styles'
import { keyframes } from '@stitches/react'

const entranceAnimation = keyframes({
  from: {
    translate: '100%',
  },
  to: {
    translate: '0%',
  },
})

export const LateralMenuWrapper = styled('section', {
  position: 'fixed',
  top: '0',
  right: '0',
  display: 'flex',
  justifyContent: 'flex-end',
  zIndex: 998,
  overflow: 'scroll',
  width: '100%',
  maxWidth: '100%',
  height: '100%',

  '@media (min-width: 680px)': {
    maxWidth: '41.5rem',
  },
})

export const OverlayBackground = styled('div', {
  position: 'fixed',
  width: '100vw',
  height: '100%',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
})

export const CloseButton = styled('button', {
  cursor: 'pointer',
  position: 'fixed',
  zIndex: 1,
  top: '5%',
  left: '92%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '$blue800',
  border: '1px solid $gray300',
  color: '$gray300',
  padding: '0.2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  opacity: 0.8,

  svg: {
    fontSize: '1.2rem',
    color: '$gray400',
  },

  '@media (min-width: 580px)': {
    top: '6%',
    left: '96.5%',
  },
})

export const SaveBtn = styled('button', {
  position: 'absolute',
  top: '88%',
  right: '85%',
  transform: 'translate(50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '2.3rem',
  height: '2.3rem',
  marginLeft: '1rem',
  borderRadius: '50%',
  border: 'none',
  color: '$blue700',
  cursor: 'pointer',
  backgroundColor: 'rgba(209, 214, 228, 1)',
  fontSize: '1.2rem',
  transition: '200ms ease',

  svg: {
    marginTop: '0.6rem',
  },

  '&:focus': {
    border: 'none',
    outline: 'none',
  },
})

export const Wrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  backgroundColor: '$blue800',
  border: 'none',
  height: '100%',
  overflow: 'scroll',
  width: '100%',
  padding: '2rem 1.5rem 2.5rem',
  borderRadius: 8,
  animation: `${entranceAnimation} 0.4s`,

  '@media (min-width: 680px)': {
    padding: '2.5rem',
  },

  '@media (min-width: 1024px)': {
    flexDirection: 'row',
  },
})

export const MediaContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
})

export const MediaContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '$blue700',
  borderRadius: '12px',
  padding: '1.5rem',
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',
  alignItems: 'center',
  width: '100%',

  '@media (min-width: 680px)': {
    padding: '2rem',
  },
})

export const MediaInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',

  '@media (min-width: 680px)': {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: '1.55rem',
  },
})

export const MovieImageWrapper = styled('div', {
  position: 'relative',
  display: 'inline-block',
})

export const MovieImage = styled('img', {
  width: 'clamp(10rem, 40vw, 12rem)',
  height: 'auto',
  borderRadius: 8,
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',

  '@media (min-width: 680px)': {
    width: 'clamp(11rem, 40vw, 12rem)',
  },
})

export const NotFoundImage = styled('div', {
  width: 'clamp(10rem, 40vw, 12rem)',
  height: 'auto',
  minHeight: '17rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  backgroundColor: '$blue800',
  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',

  '@media (min-width: 680px)': {
    width: 'clamp(11rem, 40vw, 12rem)',
  },

  p: {
    color: 'white',
    fontSize: '$bodyMd',
  },
})

export const Separator = styled('span', {
  width: '100%',
  height: 1.5,
  backgroundColor: '$blue600',
  margin: '1.2rem 0',
  opacity: 0.3,

  '@media (min-width: 680px)': {
    display: 'none',
  },
})

export const VisibleSeparator = styled('span', {
  width: '100%',
  height: 1.5,
  backgroundColor: '$blue600',
  margin: '1.5rem 0',
  opacity: 0.3,
  display: 'none',

  '@media (min-width: 680px)': {
    display: 'block',
  },
})

export const BiographyContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '0.8rem',
  width: '100%',
  maxHeight: '8.8rem',
  overflowY: 'scroll',

  '> p': {
    fontSize: '0.88rem',
    paddingRight: '0.5rem',
    fontWeight: 300,
    color: '$gray100',
    lineHeight: '1.4rem',
  },

  '@media (min-width: 480px)': {
    '> p': {
      fontSize: '0.9rem',
      lineHeight: '1.4rem',
    },
  },

  '@media (min-width: 1024px)': {
    maxWidth: '45rem',
  },
})

export const ReviewsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '0.6rem',
  width: '100%',

  '> h2': {
    fontSize: '1rem',
    fontWeight: 500,
    color: '$gray100',
  },

  '> p': {
    fontSize: '0.85rem',
    fontWeight: 300,
    color: '$gray100',
    lineHeight: '1.3rem',
  },

  '@media (min-width: 580px)': {
    '> h2': {
      fontSize: '1.2rem',
    },

    '> p': {
      fontSize: '0.95rem',
      lineHeight: '1.6rem',
    },
  },

  '@media (min-width: 1024px)': {
    maxWidth: '45rem',

    '> h2': {
      fontSize: '1.4rem',
    },

    '> p': {
      fontSize: '1rem',
      fontWeight: 300,
      color: '$gray100',
      lineHeight: '1.6rem',
    },
  },
})
