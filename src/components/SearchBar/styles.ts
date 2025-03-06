import { styled } from '../../styles'

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
  display: 'flex',
  alignItems: 'center',
  width: '100%',

  img: {
    scale: 0.7,
    opacity: 0.9,
  },

  '@media (min-width: 480px)': {
    img: {
      scale: 0.85,
    },
  },
})

export const SearchInput = styled('input', {
  backgroundColor: '$blue800',
  width: '100%',
  color: '$white',
  fontSize: '0.95rem',
  padding: '0.7rem',
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

export const SearchButton = styled('button', {
  cursor: 'pointer',
  backgroundColor: 'transparent',
  borderBottom: '1px solid $blue600',
  width: '4.5rem',
  padding: '0.5rem',
  color: '$white',
  fontSize: '$bodySm',

  '@media (min-width: 768px)': {
    padding: '0.7rem',
    width: '4.8rem',
  },
})
