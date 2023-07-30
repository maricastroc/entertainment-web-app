import { styled } from '../../styles'

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100vw',

  '@media (min-width: 1024px)': {
    flexDirection: 'row',
  },
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',

  '@media (min-width: 640px)': {
    padding: '1.5rem',
  },

  '@media (min-width: 1024px)': {
    maxWidth: '87vw',
  },
})

export const ScrollableContainer = styled('div', {
  overflow: 'scroll',
  flex: 1,
})
