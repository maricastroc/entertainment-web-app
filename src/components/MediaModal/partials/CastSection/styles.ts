import { styled } from '@/styles'

export const CastWrapper = styled('div', {
  marginTop: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '1rem',
})

export const CastContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignSelf: 'flex-start',
  gap: '0.7rem',
  width: '100%',

  '@media (min-width: 360px)': {
    gap: '1rem',
  },
})

export const CastHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  '> h2': {
    fontSize: '1.2rem',
    fontWeight: 300,
    color: '$gray100',
  },

  button: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    color: '$gray400',
    fontSize: '0.7rem',
    fontWeight: 500,
    textTransform: 'uppercase',

    '&:hover': {
      filter: 'brightness(1.6)',
      transition: 'all 200ms',
    },
  },
})

export const CastCard = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  gap: '0.7rem',
  backgroundColor: '$blue700',
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',
  padding: '0.8rem',
  borderRadius: 8,

  img: {
    display: 'block',
    overflow: 'hidden',
    outline: '1.5px solid $blue500',
    outlineOffset: 2,
    objectFit: 'cover',
    borderRadius: '50%',
    width: 32,
    height: 32,
    opacity: 0.85,
  },

  '@media (min-width: 360px)': {
    img: {
      width: 42,
      height: 42,
    },
  },
})

export const CastInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '0.1rem',
  width: '100%',

  p: {
    fontSize: '0.72rem',
    fontWeight: 500,
  },

  span: {
    fontSize: '0.72rem',
    color: '$gray300',
  },

  '@media (min-width: 360px)': {
    p: {
      fontSize: '0.85rem',
    },

    span: {
      fontSize: '0.85rem',
    },
  },
})
