import { styled } from '@/styles'

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$blue700',
  padding: '2rem',
  borderRadius: 20,
  width: '100%',
  gap: '1.5rem',

  h2: {
    alignSelf: 'flex-start',
    fontSize: '$headingLg',
    fontWeight: 300,
  },
})

export const Divider = styled('span', {
  backgroundColor: '$gray600',
  height: 0.5,
  color: '$gray600',
  width: '100%',
  marginTop: 1,
})

export const AuthContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: '1rem',
  color: '$white',
  fontSize: '$bodyMd',
  marginTop: '1.5rem',
})

export const AuthOptions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'auto',
})

export const AuthItem = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  color: '$gray300',
  fontSize: '0.9rem',
  borderRadius: 8,
  padding: '0.8rem 1rem',
  border: 'none',
  width: 'auto',
  backgroundColor: 'transparent',
  cursor: 'pointer',

  p: {
    borderBottom: '1px solid transparent',
  },

  svg: {
    color: '$purple100',
  },

  '&:hover': {
    p: {
      borderBottom: '1px solid $gray300',
      transition: '200ms',
    },
  },
})

export const VerticalDivider = styled('span', {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  height: '2rem',
  color: '$gray300',
  width: 1,
  marginTop: 1,
})
