import { styled } from '../../styles'

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  '@media (min-width: 1024px)': {
    flexDirection: 'row',
    overflowY: 'hidden',
    maxHeight: '100vh',
  },
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  width: '100%',
  paddingBottom: 0,

  '@media (min-width: 640px)': {
    padding: '1.5rem',
    paddingBottom: 0,
  },

  '@media (min-width: 1024px)': {
    overflowY: 'hidden',
    maxWidth: '87vw',
  },
})

export const MainContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '3rem',
  gap: '3.5rem',

  '@media (min-width: 1024px)': {
    justifyContent: 'flex-start',
    maxWidth: '87vw',
    paddingRight: '1rem',
    paddingBottom: '3rem',
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

export const MediaHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1.5rem',

  button: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    color: '$blue600',
    fontSize: '0.8rem',
    fontWeight: 500,
    textTransform: 'uppercase',

    '&:hover': {
      filter: 'brightness(1.6)',
      transition: 'all 200ms',
    },
  },
})

export const MediaTitle = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.7rem',

  h2: {
    fontWeight: 300,
    fontSize: '1.25rem',
  },

  '@media (min-width: 640px)': {
    gap: '1rem',

    h2: {
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
})
