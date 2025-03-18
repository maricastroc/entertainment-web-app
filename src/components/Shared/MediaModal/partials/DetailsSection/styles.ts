import { styled } from '@/styles'

export const MovieDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',

  '@media (min-width: 680px)': {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
})

export const MovieDetailsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
})

export const Heading = styled('div', {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.2rem',

  '> h2': {
    fontSize: '1.5rem',
    fontWeight: 300,
    textAlign: 'center',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
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
      fontSize: '1.8rem',
    },

    '> p': {
      fontSize: '0.9rem',
    },
  },

  '@media (min-width: 680px)': {
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

export const RatingContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',

  '> p': {
    fontSize: '2rem',
    fontWeight: 500,
    color: '$gray300',
  },

  span: {
    fontSize: '0.9rem',
    fontWeight: 300,
    color: '$gray300',
  },

  '@media (min-width: 680px)': {
    marginBottom: '1.5rem',
  },
})

export const Separator = styled('span', {
  width: '100%',
  height: 1.5,
  backgroundColor: '$blue600',
  margin: '1.2rem 0',
  opacity: 0.3,

  '@media (min-width: 680px)': {
    display: 'none',
  },
})

export const RatingWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.3rem',
})

export const VisibleSeparator = styled('span', {
  width: '100%',
  height: 1.5,
  backgroundColor: '$blue600',
  margin: '1.5rem 0',
  opacity: 0.3,
  display: 'none',

  '@media (min-width: 680px)': {
    display: 'block',
  },
})

export const GenresContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '0.6rem',
  width: '100%',

  '> h2': {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '$gray300',
    opacity: 0.8,
  },

  '@media (min-width: 580px)': {
    '> h2': {
      fontSize: '0.95rem',
    },
  },

  '@media (min-width: 680px)': {
    margin: '2rem 0 0',

    '> h2': {
      display: 'none',
    },
  },
})

export const GenresContent = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  gap: '0.6rem',
  width: '100%',

  '@media (min-width: 680px)': {
    gap: '0.8rem',
  },
})

export const GenreItem = styled('div', {
  backgroundColor: '$gray300',
  color: '$blue800',
  padding: '0.2rem 0.4rem',
  borderRadius: 8,
  fontSize: '0.78rem',
  fontWeight: 400,

  '@media (min-width: 580px)': {
    fontSize: '0.85rem',
    padding: '0.2rem 0.4rem',
  },
})
