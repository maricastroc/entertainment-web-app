import { styled } from '@/styles'

export const ReviewCardContainer = styled('div', {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$blue750',
  padding: '1.5rem',
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  width: '100%',
})

export const ReviewHeader = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '-0.3rem',
})

export const ActionsAndDate = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  span: {
    fontSize: '0.85rem',
    color: '$gray400',
  },
})

export const HeaderSeparator = styled('span', {
  width: '100%',
  height: 1.5,
  backgroundColor: '$blue600',
  opacity: 0.3,
  margin: '1rem 0 1.2rem',
})

export const ReviewContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',

  img: {
    position: 'relative',
    width: '3rem',
    height: '5rem',
    aspectRatio: '1 / 1',
    borderRadius: 8,
    objectFit: 'cover',
    transition: '0.3s ease',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.1)',
  },
})

export const ReviewContent = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  width: '100%',
  gap: '1.5rem',

  img: {
    position: 'relative',
    width: '6rem',
    height: 'auto',
    aspectRatio: '1 / 1',
    borderRadius: 8,
    objectFit: 'cover',
    transition: '0.3s ease',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.1)',
  },
})

export const ReviewDescription = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  color: '$gray300',
  lineHeight: '1.4rem',
  fontSize: '0.9rem',
  wordBreak: 'break-word',
  paddingRight: '0.3rem',
  fontWeight: 300,
  maxHeight: '6.8rem',
  marginTop: '1rem',
  overflowY: 'scroll',
  overflowX: 'hidden',

  '@media (min-width: 580px)': {
    fontSize: '0.85rem',
  },

  '@media (min-width: 1024px)': {
    marginTop: '0.75rem',
    fontWeight: 300,
  },
})

export const ReviewWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const ReviewData = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  span: {
    fontSize: '0.85rem',
    marginBottom: '0.35rem',
    color: '$gray400',
  },

  h3: {
    fontSize: '1rem',
    fontWeight: 400,
    color: '$gray100',
  },
})
