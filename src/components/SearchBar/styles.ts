import { styled } from '../../styles'

export const Container = styled('form', {
  marginTop: '1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  gap: '1rem',
  width: '100%',
})

export const SearchContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  width: '100%',

  svg: {
    color: '$gray300',
    fontSize: '0.9rem',
  },

  '@media (min-width: 480px)': {
    svg: {
      color: '$gray300',
      fontSize: '1.2rem',
    },
  },

  '@media (min-width: 768px)': {
    gap: '1rem',

    svg: {
      color: '$gray300',
      fontSize: '1.3rem',
    },
  },
})

export const SearchInput = styled('input', {
  backgroundColor: '$blue800',
  width: '100%',
  color: '$white',
  fontSize: '0.9rem',
  border: 'none',
  padding: '0.7rem',
  borderRadius: 8,

  '@media (min-width: 480px)': {
    fontSize: '1rem',
  },

  '@media (min-width: 768px)': {
    fontSize: '1.1rem',
  },
})

export const SearchButton = styled('button', {
  cursor: 'pointer',
  backgroundColor: '$blue600',
  border: 'none',
  borderRadius: 4,
  width: '4.5rem',
  padding: '0.5rem',
  color: '$white',
  fontSize: '0.8rem',

  '@media (min-width: 768px)': {
    padding: '0.7rem',
    fontSize: '0.85rem',
    width: '4.8rem',
  },
})
