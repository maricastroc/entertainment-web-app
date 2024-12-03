import { styled } from '../../styles'

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100vw',
  overflowY: 'hidden',

  '@media (min-width: 1024px)': {
    flexDirection: 'row',
  },
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  paddingBottom: 0,
  overflowY: 'hidden',

  '@media (min-width: 640px)': {
    padding: '1.5rem',
    paddingBottom: 0,
  },

  '@media (min-width: 1024px)': {
    maxWidth: '87vw',
  },
})

export const MainContent = styled('div', {
  maxHeight: '100vh',
  overflowY: 'scroll',
  paddingBottom: '15rem',

  '@media (min-width: 765px)': {
    paddingBottom: '17rem',
  },

  '@media (min-width: 1024px)': {
    justifyContent: 'flex-start',
    maxWidth: '87vw',
    paddingRight: '1rem',
    paddingBottom: '10rem',
  },
})

export const ScrollableContainer = styled('div', {
  display: 'flex',
  maxHeight: '100vh',
  overflowY: 'scroll',
  flex: 1,
})
