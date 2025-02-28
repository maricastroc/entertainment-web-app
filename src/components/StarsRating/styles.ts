import { styled } from '../../styles'

export const Rating = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.2rem',

  svg: {
    fontSize: '1.1rem',
    color: '$green100',
  },

  '@media (min-width: 580px)': {
    marginTop: '0.2rem',

    svg: {
      fontSize: '1.2rem',
      color: '$green100',
    },
  },

  variants: {
    size: {
      smaller: {
        gap: '0.1rem',
        svg: {
          fontSize: '1rem',
        },
      },
    },
  },
})
