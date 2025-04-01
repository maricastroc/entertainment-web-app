import { styled } from '@/styles'

export const ReviewsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.4rem',
  width: '100%',
  marginTop: '2.5rem',
})

export const RatingContent = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',

  '> h2': {
    fontSize: '1.2rem',
    fontWeight: 300,
    color: '$gray100',
  },

  '> p': {
    fontWeight: 300,
  },

  button: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    color: '$blue400',
    fontSize: '0.8rem',
    fontWeight: 500,
    textTransform: 'uppercase',

    '&:hover': {
      filter: 'brightness(1.3)',
      transition: 'all 200ms',
    },
  },
})

export const ReviewCardContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
})

export const UserActions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingRight: '1rem',
  width: '100%',
  gap: '0.6rem',
  marginTop: '0.5rem',
  borderRadius: 8,

  svg: {
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '$gray400',

    '&.edit_icon': {
      color: '$green500',
      filter: 'brightness(1.5)',
    },

    '&.delete_icon': {
      color: '$red300',
      filter: 'brightness(1.5)',
    },

    '&:hover': {
      filter: 'brightness(1.8)',
      transition: '200ms ease-in-out',
    },
  },
})
