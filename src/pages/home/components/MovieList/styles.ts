import { styled } from '../../../../styles'

export const MovieContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '3rem',

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

export const MovieHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1.5rem',

  button: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '$blue600',
    fontSize: '0.8rem',
    fontWeight: 500,
    textTransform: 'uppercase',
  },
})

export const MovieTitle = styled('div', {
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

export const MovieTag = styled('div', {
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

export const MovieContent = styled('div', {
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

    '> :nth-last-child(-n + 2)': {
      gridColumn: 'span 2',
    },
  },
})
