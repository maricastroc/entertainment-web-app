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
  backgroundColor: '$blue800',
  border: '1px solid $gray300',
  color: '$gray300',
  padding: '0.15rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  opacity: 0.7,
  transition: '200ms',

  svg: {
    fontSize: '1rem',
    color: '$gray400',
  },

  '&:hover': {
    color: 'white',
  },
})

export const InfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '0.55rem',
  borderBottom: '1px solid $blue650',
  paddingBottom: '2rem',
  marginBottom: '1.8rem',
  width: '100%',

  h2: {
    fontWeight: 400,
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
