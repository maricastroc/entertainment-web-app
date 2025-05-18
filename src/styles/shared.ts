import { styled } from '@/styles'

import {
  Content as RadixContent,
  Title as RadixTitle,
  Close as RadixClose,
  Overlay as RadixOverlay,
  Description as RadixDescription,
} from '@radix-ui/react-dialog'
import { keyframes } from '@stitches/react'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const slideDown = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(-50%, -60%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translate(-50%, -50%)',
  },
})

const slideUp = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translate(-50%, -50%)',
  },
  '100%': {
    opacity: 0,
    transform: 'translate(-50%, -60%)',
  },
})

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  '@media (min-width: 1024px)': {
    flexDirection: 'row',
    maxHeight: '100vh',
    overflowY: 'scroll',
  },
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  width: '100%',
  gap: '1.5rem',

  '@media (min-width: 640px)': {
    padding: '1.5rem',
  },

  '@media (min-width: 1024px)': {
    maxWidth: '87vw',
  },
})

export const MainContent = styled('div', {
  '@media (min-width: 650px)': {
    justifyContent: 'flex-start',
  },

  '@media (min-width: 1024px)': {
    justifyContent: 'flex-start',
    paddingRight: '1rem',
    maxHeight: '100vh',
    overflowY: 'scroll',
  },
})

export const MediaContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '> h2': {
    fontWeight: 300,
    fontSize: '1.25rem',
    marginBottom: '1.5rem',
  },

  '@media (min-width: 640px)': {
    '> h2': {
      fontSize: '2rem',
    },
  },
})

export const MediaContent = styled('div', {
  display: 'grid',
  gap: '2rem 1rem',
  gridTemplateColumns: '1fr',
  width: '100%',
  overflow: 'hidden',
  placeItems: 'center',
  flex: 1,

  '@media (min-width: 380px)': {
    gridTemplateColumns: '1fr 1fr',
  },

  '@media (min-width: 610px)': {
    gap: '1.8rem 1.8rem',
    gridTemplateColumns: '1fr 1fr 1fr',
  },

  '@media (min-width: 980px)': {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: '2.5rem 1.8rem',
  },

  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-state="open"]': {
      animation: `${slideDown} 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
    },
    '&[data-state="closed"]': {
      animation: `${slideUp} 200ms cubic-bezier(0.55, 0, 0.55, 0.2) forwards`,
    },
  },
})

export const ModalOverlay = styled(RadixOverlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  zIndex: 9997,
  backgroundColor: 'rgba(10, 10, 10, 0.2)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',

  variants: {
    hasOverlay: {
      false: {
        backgroundColor: 'transparent',
      },
    },
  },

  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-state="open"]': {
      animation: `${overlayShow} 200ms ease-out forwards`,
    },
    '&[data-state="closed"]': {
      animation: `${overlayShow} 200ms ease-in forwards`,
    },
  },
})

export const ModalDescription = styled(RadixDescription, {
  fontSize: '1rem',
  width: '100%',
  textAlign: 'left',
  color: '$gray300',
  lineHeight: '1.5rem',
  marginBottom: '0.5rem',
})

export const ModalContent = styled(RadixContent, {
  padding: '1.5rem',
  backgroundColor: '$blue700',
  color: '$gray300',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'clamp(300px, 80vw, 320px)',
  borderRadius: '4px',
  zIndex: 9998,
  overflow: 'scroll',
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',
  height: 'auto',

  '@media (min-width: 480px)': {
    width: 'clamp(300px, 85vw, 460px)',
    height: 'auto',
  },

  '@media (min-width: 768px)': {
    padding: '2rem',
    width: 'clamp(20rem, 80vw, 30rem)',
  },

  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-state="open"]': {
      animation: `${overlayShow} 200ms ease-out forwards`,
    },
    '&[data-state="closed"]': {
      animation: `${overlayShow} 200ms ease-in forwards`,
    },
  },
})

export const ModalTitle = styled(RadixTitle, {
  alignSelf: 'flex-start',
  fontSize: '$headingMd',
  fontWeight: 300,
})

export const ModalCloseButton = styled(RadixClose, {
  color: '$gray300',
  fontWeight: '700',
  display: 'flex',
  width: '1.5rem',
  justifyContent: 'flex-end',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: '0',
  marginTop: '0.1rem',

  svg: {
    color: '$gray300',
    fontSize: '1.3rem',
  },

  '&:hover': {
    transition: '200ms ease',

    svg: {
      filter: 'brightness(1.2)',
    },
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $blue600',
  },

  '@media (min-width: 480px)': {
    marginTop: 0,
  },
})

export const ModalHeader = styled('div', {
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '1rem',

  '@media (min-width: 480px)': {
    alignItems: 'center',
  },
})

export const NotFoundImage = styled('img', {
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: 8,
  filter: 'blur(2px)',
  objectFit: 'cover',
  maxHeight: 140,
})
