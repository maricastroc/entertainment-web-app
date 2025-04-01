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

export const OverlayBackground = styled('div', {
  position: 'fixed',
  width: '100vw',
  height: '100%',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
})

export const Wrapper = styled('div', {
  position: 'fixed',
  top: '0',
  right: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 998,
  overflow: 'scroll',
  width: '100%',
  maxWidth: '100%',
  height: '100%',
})

export const Content = styled('div', {
  position: 'relative',
  display: 'flex',
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  backgroundColor: '$blue700',
  border: 'none',
  height: '100%',
  overflow: 'scroll',
  width: '100%',
  maxWidth: '50rem',
  maxHeight: '100vh',
  padding: '1.75rem 1.25rem',
  borderRadius: 8,
  animation: `${entranceAnimation} 0.4s`,

  iframe: {
    width: '100%',
    height: '80%',
    borderRadius: '16px',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',
  },

  '@media (min-width: 680px)': {
    padding: '2rem',
    maxHeight: '90vh',
    width: '90vw',
  },
})

export const Header = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
})

export const CloseButton = styled('button', {
  cursor: 'pointer',
  zIndex: 1,
  backgroundColor: '$blue800',
  border: '1px solid $gray300',
  color: '$gray300',
  padding: '0.2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  opacity: 0.7,
  marginTop: '-0.5rem',
  marginRight: '-0.5rem',

  svg: {
    fontSize: '1.2rem',
    color: '$gray400',
  },
})

export const InfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '0.55rem',
  width: '100%',

  h2: {
    fontWeight: 400,
    fontSize: '$headingMd',
  },
})

export const InfoData = styled('div', {
  display: 'flex',
  alignItems: 'center',

  p: {
    color: '$gray300',
    fontSize: '0.95rem',
    fontWeight: 300,

    svg: {
      color: '$gray300',
      fontSize: '0.8rem',
      marginRight: '0.4rem',
    },
  },

  span: {
    color: '$gray300',
    margin: '0 0.5rem',
  },
})

export const Divider = styled('span', {
  backgroundColor: '$blue600',
  height: 0.5,
  color: '$blue600',
  width: '100%',
  marginTop: '1.5rem',
  marginBottom: '1.5rem',

  '@media (min-width: 680px)': {
    marginTop: '2rem',
    marginBottom: '2.5rem',
  },
})

export const CreditsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  width: '100%',
  height: '100%',
  gap: '2rem',
})

export const CastWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem',

  '> h2': {
    fontSize: '1.2rem',
    fontWeight: 300,
    color: '$gray100',
    position: 'sticky',
  },
})

export const CastContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignSelf: 'flex-start',
  gap: '1rem',
  width: '100%',
  paddingRight: '1rem',
  height: '100%',

  '@media (min-width: 520px)': {
    gridTemplateColumns: '1fr 1fr',
  },
})

export const CastCard = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  gap: '0.7rem',
  backgroundColor: '$blue800',
  boxShadow: '0 2px 3px rgba(0, 0, 0, 0.4), 0 3px 8px rgba(0, 0, 0, 0.2)',
  padding: '0.8rem',
  borderRadius: 8,

  img: {
    display: 'block',
    overflow: 'hidden',
    outline: '1.5px solid $green400',
    outlineOffset: 2,
    objectFit: 'cover',
    borderRadius: '50%',
    width: 42,
    height: 42,
    opacity: 0.85,
  },
})

export const CastInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '0.1rem',
  width: '100%',

  p: {
    fontSize: '0.85rem',
    fontWeight: 500,
  },

  '> span': {
    fontSize: '0.85rem',
    color: '$gray300',
  },
})
