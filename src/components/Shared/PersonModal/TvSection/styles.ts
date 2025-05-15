import { styled } from '@/styles'

export const SimilarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
  scrollPaddingBottom: '2rem',

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
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflowX: 'scroll',
  backgroundColor: 'transparent',
  borderRadius: '12px',
  padding: '1.5rem',
  paddingLeft: 0,
  gap: '1.5rem',
  width: '100%',
})

export const CaretRightIcon = styled('div', {
  position: 'absolute',
  cursor: 'pointer',
  right: 0,
  top: '38%',
  zIndex: 999,
  color: '$gray100',
  fontSize: 36,
})

export const CaretLeftIcon = styled('div', {
  position: 'absolute',
  cursor: 'pointer',
  left: 0,
  top: '38%',
  zIndex: 999,
  opacity: 0.85,
  color: '$gray100',
  fontSize: 36,
})
