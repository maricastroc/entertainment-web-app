import { styled } from '@/styles'

export const SimilarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  marginTop: '2rem',

  '> h2': {
    fontSize: '1.2rem',
    fontWeight: 300,
    color: '$gray100',
  },

  '> p': {
    fontSize: '0.85rem',
    fontWeight: 300,
    color: '$gray100',
    lineHeight: '1.3rem',
  },

  '@media (min-width: 1024px)': {
    maxWidth: '45rem',

    '> p': {
      fontSize: '1rem',
      fontWeight: 300,
      color: '$gray100',
      lineHeight: '1.6rem',
    },
  },
})

export const SimilarContent = styled('div', {
  display: 'flex',
  overflowX: 'scroll',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '$blue700',
  borderRadius: '12px',
  padding: '1.5rem',
  gap: '1.5rem',
  width: '100%',
})
