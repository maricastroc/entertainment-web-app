import { styled } from '@/styles'

export const SignInPageWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3rem 1.5rem 3rem',
  maxWidth: 'clamp(80rem, 85%, 40rem)',
  height: '100vh',
  zIndex: '0',
  overflow: 'scroll',

  '@media (min-width: 980px)': {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    alignItems: 'center',
    padding: '0 1.5rem',
    margin: '0 auto',
    maxWidth: '100%',
  },

  '@media (min-width: 1200px)': {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    maxWidth: '90rem',
    margin: '0 auto',
    overflow: 'hidden',
  },
})

export const CoverContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.7rem 1.25rem',
  position: 'relative',
  width: '100%',

  '.cover_image': {
    display: 'none',
  },

  '.logo_image': {
    alignSelf: 'flex-start',
    position: 'relative',
    width: '210px',
    height: 'auto',
  },

  '@media (min-width: 980px)': {
    '.cover_image': {
      display: 'flex',
      borderRadius: '12px',
      width: '100%',
    },

    '.logo_image': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '210px',
      height: 'auto',
    },
  },
})

export const DividerLine = styled('span', {
  width: '100%',
  height: 0.7,
  backgroundColor: '$gray300',
  margin: '0.5rem 0 2.5rem',

  '@media (min-width: 980px)': {
    display: 'none',
  },
})

export const WelcomeContent = styled('div', {
  display: 'flex',
  padding: '0 1.25rem',
  gap: '3.8rem',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '30rem',

  '@media (min-width: 980px)': {
    padding: '3.5rem 1.25rem',
    minWidth: '25rem',
    gap: '3rem',
  },

  '@media (min-width: 1200px)': {
    maxWidth: '30rem',
  },
})

export const WelcomeContainer = styled('div', {
  display: 'flex',
  width: '100%',
  gap: '3.8rem',
  alignItems: 'center',
  justifyContent: 'center',

  '@media (min-width: 480px)': {
    alignItems: 'center',
  },
})

export const Heading = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
  textAlign: 'center',

  h2: {
    fontSize: '1.5rem',
    fontWeight: 400,
  },

  p: {
    color: '$gray200',
    fontWeight: 300,
  },

  '@media (min-width: 980px)': {
    textAlign: 'left',
  },
})
