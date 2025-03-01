import { styled } from '@/styles'

export const FormContainer = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '100%',
})

export const SignUpBtn = styled('button', {
  backgroundColor: '$transparent',
  cursor: 'pointer',
  fontSize: '0.8rem',
  border: 'none',
  color: '$gray400',
  marginTop: '-1rem',
  fontWeight: 300,

  span: {
    color: '$blue400',
  },

  '&:hover': {
    color: '$gray300',
    transition: '200ms',
  },

  '@media (min-width: 480px)': {
    fontSize: '0.9rem',
  },
})

export const Divider = styled('span', {
  backgroundColor: '$gray600',
  height: 0.5,
  color: '$gray600',
  width: '100%',
  marginTop: 1,
})

export const Input = styled('input', {
  backgroundColor: 'transparent',
  border: 'solid 1px $blue600',
  color: '$gray100',
  padding: '0.75rem 0.6rem',
  fontSize: '0.95rem',
  borderRadius: 6,

  '&:focus': {
    backgroundColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
  },
})

export const AuthContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: '1.8rem',
  color: '$gray300',
  fontSize: '0.9rem',
})

export const AuthOptions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
  width: '100%',

  '@media (min-width: 480px)': {
    flexDirection: 'row',
    width: 'auto',
  },
})

export const AuthItem = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  color: '$gray300',
  fontSize: '0.9rem',
  border: '1px solid $gray500',
  borderRadius: 8,
  padding: '0.8rem 1rem',
  backgroundColor: 'transparent',
  width: '100%',
  cursor: 'pointer',

  p: {
    borderBottom: '1px solid transparent',
  },

  svg: {
    color: '$purple100',
  },

  '@media (min-width: 480px)': {
    border: 'none',
    width: 'auto',
    backgroundColor: 'transparent',
    padding: 0,

    '&:hover': {
      p: {
        borderBottom: '1px solid $gray300',
        transition: '200ms',
      },
    },
  },
})

export const HorizontalDivider = styled('span', {
  backgroundColor: '$gray600',
  height: '2rem',
  color: '$gray300',
  width: 1,
  marginTop: 1,
})
