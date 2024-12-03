import { styled } from '../../styles'

export const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '4rem auto',
  backgroundColor: '$blue800',
  border: '2px solid $blue600',
  borderRadius: 8,
  maxWidth: '18rem',
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
      },
    },
  },

  svg: {
    marginRight: '0.5rem',
  },

  '&:not(:disabled):hover': {
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
      },
    },
  },

  '&:not(:disabled):hover': {
    color: '$gray100',
    transition: 'all 200ms',
  },

  svg: {
    marginLeft: '0.5rem',
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
