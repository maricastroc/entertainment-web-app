import { styled } from '../../styles'

export const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '4rem auto',
  backgroundColor: '$blue800',
  border: '2px solid $blue600',
  maxWidth: '18rem',
  borderRadius: 8,
})

export const PrevButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: '$blue800',
  borderColor: 'transparent',
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8,
  color: '$blue600',
  padding: '0.4rem',
  fontSize: '0.9rem',
  width: '5rem',

  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },

  svg: {
    marginRight: '0.5rem',
    marginTop: '0.1rem',
  },

  '&:hover': {
    color: '$gray100',
    transition: 'all 200ms',
  },
})

export const NextButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: '$blue800',
  borderColor: 'transparent',
  borderTopRightRadius: 8,
  borderBottomRightRadius: 8,
  padding: '0.4rem',
  color: '$blue600',
  fontSize: '0.9rem',
  width: '5rem',

  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  },

  '&:hover': {
    color: '$gray100',
    transition: 'all 200ms',
  },

  svg: {
    marginLeft: '0.5rem',
    marginTop: '0.1rem',
  },
})

export const Pagination = styled('div', {
  backgroundColor: '$blue600',
  border: '2px solid $blue600',
  padding: '0.4rem',
  color: '$gray100',
  fontSize: '0.9rem',
  width: '8rem',
  textAlign: 'center',
})
