import { styled } from '@/styles'

export const Container = styled('div', {
  margin: '0.5rem 0 1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  gap: '1rem',
  width: '100%',

  '@media (min-width: 1024px)': {
    margin: '1.5rem 0',
  },
})

export const SearchContent = styled('div', {
  position: 'relative',
  width: '100%',
})

export const SearchInput = styled('input', {
  backgroundColor: '$blue800',
  width: '100%',
  color: '$white',
  fontSize: '0.95rem',
  padding: '0.7rem 2.5rem 0.7rem 3rem',
  border: 'none',
  borderBottom: '2px solid transparent',

  '&:focus': {
    borderBottom: '2px solid $blue600',
    outline: 'none',
    boxShadow: 'none',
  },

  '@media (min-width: 480px)': {
    fontSize: '1rem',
  },

  '@media (min-width: 768px)': {
    fontSize: '1.1rem',
  },
})

export const SearchIconWrapper = styled('div', {
  position: 'absolute',
  left: '0.5rem',
  paddingRight: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',

  svg: {
    color: '$gray300',
  },
})

export const ClearButton = styled('button', {
  position: 'absolute',
  right: '0.5rem',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '$white',
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    color: '$gray300',
  },
})
