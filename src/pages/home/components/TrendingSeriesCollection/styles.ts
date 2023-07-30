import { styled } from '../../../../styles'

export const TrendingContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'scroll',
  minWidth: 'fit-content',
  paddingBottom: '0.5rem',
  flex: 1,

  '> h2': {
    fontWeight: 300,
    fontSize: '1.25rem',
    margin: '2rem 0 1.5rem',
  },

  '@media (min-width: 640px)': {
    '> h2': {
      fontSize: '2rem',
    },
  },
})

export const TrendingContent = styled('div', {
  display: 'flex',
  overflow: 'scroll',
  gap: '1rem',

  '@media (min-width: 640px)': {
    gap: '2.5rem',
  },
})
