import { styled } from '@/styles'

export const Container = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: '$blue700',
  padding: '1.5rem',
  position: 'sticky',
  top: 0,
  zIndex: 10,

  '> svg': {
    fontSize: '1.6rem',
    color: '$red300',
  },

  '@media (min-width: 768px)': {
    margin: '1.5rem 1.5rem 0.5rem',
    borderRadius: 8,
    width: 'auto',
  },

  '@media (min-width: 1024px)': {
    flexDirection: 'column',
    padding: '2.1rem',
    height: '90vh',
    margin: '2rem',
    width: 96,

    '> svg': {
      fontSize: '1.8rem',
    },
  },
})

export const ButtonPagesContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',

  svg: {
    cursor: 'pointer',
    color: '$blue600',
    fontSize: '1.2rem',

    variants: {
      active: {
        true: {
          color: '$gray100',
        },
      },
    },

    '&:hover': {
      color: '$red300',
      transition: 'all 200ms',
    },
  },

  '@media (min-width: 480px)': {
    gap: '2.5rem',
  },

  '@media (min-width: 1024px)': {
    flexDirection: 'column',

    svg: {
      fontSize: '1.4rem',
    },
  },
})
