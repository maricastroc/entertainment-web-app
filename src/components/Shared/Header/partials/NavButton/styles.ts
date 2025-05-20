import { styled } from '@/styles'

export const StyledNavButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  backgroundColor: 'transparent',
  position: 'relative',

  variants: {
    active: {
      true: {
        img: {
          filter: 'brightness(300%)',
        },
      },
    },
  },

  img: {
    cursor: 'pointer',
    fontSize: '1.2rem',
    transition: 'all 200ms',

    '&:hover': {
      transition: 'all 200ms',
      filter:
        'invert(22%) brightness(80%) sepia(100%) saturate(592%) hue-rotate(-50deg)',
    },
  },
})
