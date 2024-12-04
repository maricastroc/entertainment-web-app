import { styled } from '@/styles'

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
})
