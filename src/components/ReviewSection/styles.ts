import { styled } from '@/styles'

export const ReviewsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.4rem',
  width: '100%',
  marginTop: '2.5rem',

  '> h2': {
    fontSize: '1.2rem',
    fontWeight: 300,
    color: '$gray100',
  },

  '> p': {
    fontWeight: 300,
  },
})

export const ReviewCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  backgroundColor: '$blue700',
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',
  padding: '1.2rem',
  borderRadius: 8,
  width: '100%',

  '@media (min-width: 580px)': {
    padding: '1.75rem',
  },
})

export const Header = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  gap: '0.9rem',

  '@media (min-width: 580px)': {
    justifyContent: 'space-between',
  },
})

export const UserInfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '0.5rem',
  width: '100%',

  '@media (min-width: 580px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export const Avatar = styled('img', {
  display: 'flex',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'solid 2px $red300',
})

export const ReviewContent = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  fontSize: '0.8rem',
  fontWeight: 300,
  color: '$gray300',
  lineHeight: '1.3rem',
  maxHeight: '8rem',
  paddingRight: '0.8rem',
  marginTop: '1rem',
  overflowY: 'scroll',

  a: {
    color: '$gray300',
  },

  '@media (min-width: 580px)': {
    fontSize: '0.85rem',
  },

  '@media (min-width: 1024px)': {
    fontWeight: 300,
    color: '$gray100',
  },
})
