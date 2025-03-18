import { styled } from '@/styles'

import {
  Content as RadixContent,
  Title as RadixTitle,
  Close as RadixClose,
  Overlay as RadixOverlay,
  Description as RadixDescription,
} from '@radix-ui/react-dialog'

export const Overlay = styled(RadixOverlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  zIndex: 9997,
  backgroundColor: 'rgba(10, 10, 10, 0.7)',
})

export const Description = styled(RadixDescription, {
  fontSize: '1rem',
  width: '100%',
  textAlign: 'left',
  color: '$gray300',
  lineHeight: '180%',
  marginBottom: '1rem',
})

export const Content = styled(RadixContent, {
  padding: '1.5rem 1rem 3rem',
  backgroundColor: '$blue800',
  color: '$gray300',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'clamp(300px, 80vw, 300px)',
  borderRadius: '4px',
  zIndex: 9998,
  overflow: 'scroll',
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',
  height: '100%',

  '@media (min-width: 480px)': {
    width: 'clamp(300px, 85vw, 460px)',
    height: 'auto',
  },

  '@media (min-width: 768px)': {
    padding: '2rem',
    width: 'clamp(20rem, 80vw, 30rem)',
  },
})

export const Title = styled(RadixTitle, {
  alignSelf: 'flex-start',
  fontSize: '$headingMd',
  fontWeight: 300,
})

export const Header = styled('div', {
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '1rem',

  '@media (min-width: 480px)': {
    alignItems: 'center',
  },
})

export const CloseButton = styled(RadixClose, {
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
