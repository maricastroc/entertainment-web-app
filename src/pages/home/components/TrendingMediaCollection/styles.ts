import { styled } from '../../../../styles'

export const TrendingContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'scroll',
  paddingBottom: '0.5rem',

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
  minWidth: 'fit-content',
  flex: 1,

  '@media (min-width: 640px)': {
    gap: '2.5rem',
  },
})

export const MediaHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 0 1.5rem',
  maxWidth: '90vw',

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

export const MediaTag = styled('div', {
  marginTop: '0.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  border: 'solid 1px $white',
  color: '$gray100',
  borderRadius: 8,
  padding: '0.15rem 0.4rem',

  p: {
    fontSize: '0.55rem',
    fontWeight: 500,
    textTransform: 'uppercase',
  },

  '@media (min-width: 640px)': {
    marginTop: '0.8rem',

    p: {
      fontSize: '0.65rem',
    },
  },
})
