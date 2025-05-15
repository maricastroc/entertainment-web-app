import { styled } from '@/styles'

export const CastWrapper = styled('div', {
  position: 'relative',
  marginTop: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '1rem',
})

export const CastContainer = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  overflowX: 'auto',
  gap: '0.7rem',
  width: '100%',
  paddingBottom: '0.5rem',
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
    color: '$blue400',
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase',

    '&:hover': {
      filter: 'brightness(1.3)',
      transition: 'all 200ms',
    },
  },
})

export const CastCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '0.85rem 0.5rem',
  minWidth: '7.5rem',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  gap: '0.7rem',
  backgroundColor: '$blue700',
  boxShadow: '0 3px 2px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',
  borderRadius: 8,

  img: {
    display: 'block',
      cursor: 'pointer',
    overflow: 'hidden',
    outline: '1.5px solid $blue600',
    outlineOffset: 2,
    objectFit: 'cover',
    borderRadius: '50%',
    width: 58,
    height: 58,
    opacity: 0.95,
    transition: 'all 200ms',

      '&:hover': {
    outline: '1.5px solid $green400',
  }
  },
})

export const CastInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.1rem',
  width: '100%',
  textAlign: 'center',

  p: {
    fontSize: '0.8rem',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    overflow: 'hidden',
    maxWidth: '90%',
  },

  span: {
    fontSize: '0.8rem',
    color: '$gray300',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    overflow: 'hidden',
    maxWidth: '90%',
  },
})

export const CaretRightIcon = styled('div', {
  position: 'absolute',
  cursor: 'pointer',
  right: 0,
  top: '47%',
  zIndex: 999,
  color: '$gray100',
  fontSize: 30,
})

export const CaretLeftIcon = styled('div', {
  position: 'absolute',
  cursor: 'pointer',
  left: 0,
  top: '47%',
  zIndex: 999,
  opacity: 0.85,
  color: '$gray100',
  fontSize: 30,
})
