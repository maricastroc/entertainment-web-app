import { styled } from '@/styles'

export const Container = styled('div', {
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
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '0.9rem',

  '@media (min-width: 580px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export const UserInfoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '0.8rem',
  width: '100%',
})

export const UserInfoData = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '0.2rem',
  width: '100%',

  span: {
    fontSize: '0.8rem',
    color: '$gray400',
  },
})

export const Content = styled('div', {
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
  maxHeight: '8rem',
  marginTop: '1.2rem',
  overflowY: 'scroll',
  overflowX: 'hidden',

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
