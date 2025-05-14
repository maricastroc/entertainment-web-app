import { styled } from '../../styles'

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
