import { styled } from '@/styles'

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100vw',

  '@media (min-width: 1024px)': {
    flexDirection: 'row',
    paddingRight: '1.5rem',
    maxHeight: '100vh',
    overflowY: 'scroll',
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
    minWidth: '87vw',
  },
})
