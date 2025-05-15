import { styled } from '@/styles'

export const PersonDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'space-between',
  width: '100%',

  '@media (min-width: 680px)': {
    alignItems: 'flex-start',
    gap: '1rem',
  },
})

export const PersonDetailsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
})

export const PopularityWrapper = styled('div', {
  margin: '1rem 0',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  gap: '0.8rem',

  svg: {
    fontWeight: 400,
    color: '$green400',
    fontSize: '1.4rem',
  },
})

export const PopularityValue = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',

  span: {
    fontSize: '1.8rem',
    fontWeight: 500,
    color: '$gray300',
  },

  p: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '$gray300',
    maxWidth: '5rem',
    opacity: 0.8,
  },
})

export const Heading = styled('div', {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.2rem',
  marginBottom: '1.2rem',

  '> h2': {
    fontSize: '1.5rem',
    fontWeight: 300,
    textAlign: 'center',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'scroll',
    textOverflow: 'ellipsis',
  },

  '> p': {
    fontSize: '0.8rem',
    color: '$gray300',
    fontWeight: 300,
    opacity: 0.7,
    textAlign: 'center',
  },

  '@media (min-width: 580px)': {
    '> h2': {
      fontSize: '1.85rem',
    },

    '> p': {
      fontSize: '0.9rem',
    },
  },

  '@media (min-width: 680px)': {
    marginBottom: '0',
    marginTop: 0,
    alignItems: 'flex-start',

    '> h2': {
      textAlign: 'left',
    },

    '> p': {
      textAlign: 'left',
    },
  },
})

export const Separator = styled('span', {
  width: '100%',
  height: 1.5,
  backgroundColor: '$blue600',
  opacity: 0.3,
})

export const SocialIconsContainer = styled('div', {
  display: 'flex',
  gap: '1rem',
  padding: '1rem 0',
})

export const SocialIconLink = styled('a', {
  color: '$white',
  transition: 'color 0.2s',
  '&:hover': {
    color: '$primary',
  },
})
