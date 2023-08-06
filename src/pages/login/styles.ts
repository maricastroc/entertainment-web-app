import { styled } from '../../styles'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6rem 1.5rem 3rem',
  height: '100%',
  maxWidth: 'clamp(80rem, 85%, 40rem)',

  '@media (min-width: 820px)': {
    padding: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export const CoverContainer = styled('div', {
  display: 'flex',
  padding: '1.25rem',
  position: 'relative',

  '.cover_image': {
    display: 'none',
  },

  '.logo_image': {
    alignSelf: 'flex-start',
    position: 'relative',
    width: '210px',
    height: 'auto',
  },

  '@media (min-width: 820px)': {
    minHeight: '100vh',
    height: '100%',

    '.cover_image': {
      display: 'flex',
      width: '50vw',
      height: 'auto',
      borderRadius: '12px',
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

  '@media (min-width: 1150px)': {
    '.cover_image': {
      minWidth: '100%',
    },
  },
})

export const Separator = styled('span', {
  width: '100%',
  height: 0.7,
  backgroundColor: '$gray700',
  margin: '0.5rem 0 4rem',

  '@media (min-width: 820px)': {
    display: 'none',
  },
})

export const WelcomeContainer = styled('div', {
  display: 'flex',
  padding: '1.25rem',
  gap: '3.8rem',
  flexDirection: 'column',
  alignItems: 'center',

  '@media (min-width: 480px)': {
    alignItems: 'flex-start',
  },
})

export const Heading = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
  textAlign: 'center',

  h2: {
    fontSize: '1.5rem',
    fontWeight: 500,
  },

  p: {
    color: '$gray200',
    fontWeight: 300,
  },

  '@media (min-width: 480px)': {
    textAlign: 'left',
  },
})

export const ButtonsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

export const ButtonAccess = styled('button', {
  cursor: 'pointer',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
  backgroundColor: '$blue700',
  borderRadius: 8,
  padding: '1.25rem 1.5rem',
  width: '16rem',
  fontSize: '0.95rem',

  svg: {
    fontSize: 32,
  },

  p: {
    color: '$gray100',
    fontWeight: 500,
  },

  '& .rocket-icon': {
    color: '$blue600',
  },

  '&:hover': {
    filter: 'brightness(1.5)',
    transition: 'all 200ms',
  },

  '@media (min-width: 350px)': {
    width: '18rem',
  },

  '@media (min-width: 480px)': {
    fontSize: '1.1rem',
    width: '23.25rem',
  },

  '@media (min-width: 820px)': {
    width: 'clamp(15rem, 40vw, 23rem)',
  },

  '@media (min-width: 920px)': {
    width: '23.25rem',
  },
})
