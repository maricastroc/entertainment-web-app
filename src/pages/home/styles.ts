import { styled } from '../../styles'

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100vw',

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
  paddingBottom: '3rem',

  '@media (min-width: 1024px)': {
    justifyContent: 'flex-start',
    maxWidth: '87vw',
    paddingRight: '1rem',
    paddingBottom: '5rem',
    maxHeight: '100vh',
    overflowY: 'scroll',
  },
})

export const ScrollableContainer = styled('div', {
  display: 'flex',
  maxHeight: '100vh',
  overflowX: 'scroll',
  flex: 1,
})
