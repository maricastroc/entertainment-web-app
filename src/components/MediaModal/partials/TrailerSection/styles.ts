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
