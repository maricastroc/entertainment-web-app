import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  alignItems: 'center',
  marginTop: '1.5rem',
  justifyContent: 'flex-start',
  overflow: 'auto',

  '@media (min-width: 1024px)': {
    marginTop: 0,
    marginLeft: '-3rem',
  },
})

export const ProfileWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '85vw',
  maxWidth: '40rem',
  borderRadius: 20,
})

export const HorizontalSeparator = styled('span', {
  width: '100%',
  height: 1.5,
  backgroundColor: '$blue600',
  opacity: 0.3,
})

export const VerticalSeparator = styled('span', {
  width: 1.5,
  height: 15,
  backgroundColor: '$gray100',
  margin: '1.2rem 0',
  opacity: 0.3,
})

export const ProfileMenu = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  borderRadius: 10,
  padding: '1rem 1.5rem 0.5rem 1.5rem',
  gap: '1rem',

  svg: {
    color: '$blue600',
  },
})

export const MenuBtn = styled('button', {
  width: '28%',
  backgroundColor: 'transparent',
  color: '$blue400',
  letterSpacing: 2,
  textTransform: 'uppercase',
  borderColor: 'transparent',
  padding: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 200ms',
  cursor: 'pointer',
  fontSize: '0.8rem',

  '&:hover': {
    color: '$gray100',
  },

  variants: {
    isActive: {
      true: {
        color: '$gray100',
      },
    },
  },

  '@media (min-width: 480px)': {
    fontSize: '0.85rem',
  },
})

export const ContentWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '1.2rem 0',
  width: '100%',
  height: '100%',
  gap: '1rem',

  h2: {
    alignSelf: 'flex-start',
    fontSize: '1.6rem',
    fontWeight: 300,
  },

  '@media (min-width: 480px)': {
    h2: {
      fontSize: '$headingLg',
    },
  },

  '@media (min-width: 1024px)': {
    height: '75vh',
    overflowY: 'scroll',
    padding: '2rem 2rem 0',
  },
})

export const ReviewsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
  width: '100%',
})

export const EmptyReviews = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '0.5rem',
  padding: '2rem',
  backgroundColor: '$blue50',
  maxWidth: '500px',
  margin: '0 auto',

  svg: {
    fontSize: '4rem',
    color: '$blue400',
    marginBottom: '1rem',
    opacity: 0.8,
  },

  h3: {
    fontSize: '1.5rem',
    fontWeight: 500,
    color: '$blue600',
  },

  p: {
    fontSize: '1rem',
    color: '$blue400',
    marginTop: '-0.1rem',
  },
})
