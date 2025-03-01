import { styled } from '@/styles'

export const MovieDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',

  '@media (min-width: 768px)': {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
})

export const MovieDetailsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',

  '@media (min-width: 768px)': {
    alignItems: 'flex-start',
  },
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

  '@media (min-width: 768px)': {
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
  gap: '0.3rem',

  '> h2': {
    fontSize: '2rem',
    fontWeight: 500,
    color: '$gray300',
  },

  '> button': {
    backgroundColor: 'transparent',
    color: '$gray300',
    padding: '0.5rem 0.6rem',
    border: '2px solid $blue600',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    width: '6.8rem',
    justifyContent: 'center',
    textDecoration: 'none',
    marginTop: '0.5rem',
    cursor: 'pointer',
    transition: '200ms',

    '&:hover': {
      backgroundColor: '$blue600',
      border: '2px solid $blue600',
      color: '$gray300',
    },
  },

  '@media (min-width: 580px)': {
    '> h2': {
      fontSize: '2.3rem',
    },
  },

  '@media (min-width: 768px)': {
    marginTop: '1.5rem',

    '> h2': {
      fontSize: '1.8rem',
    },

    '> button': {
      marginTop: 0,
    },

    flexDirection: 'row',
    gap: '1rem',
  },
})

export const Separator = styled('span', {
  width: '100%',
  height: 1.5,
  backgroundColor: '$blue600',
  margin: '1.5rem 0',
  opacity: 0.3,

  '@media (min-width: 768px)': {
    display: 'none',
  },
})

export const VisibleSeparator = styled('span', {
  width: '100%',
  height: 1.5,
  backgroundColor: '$blue600',
  margin: '1.5rem 0',
  opacity: 0.3,
  display: 'none',

  '@media (min-width: 768px)': {
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

  '@media (min-width: 768px)': {
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

  '@media (min-width: 768px)': {
    gap: '0.8rem',
  },
})

export const GenreItem = styled('div', {
  backgroundColor: '$gray300',
  color: '$blue800',
  padding: '0.2rem 0.4rem',
  borderRadius: 8,
  fontSize: '0.78rem',

  '@media (min-width: 580px)': {
    fontSize: '0.85rem',
    padding: '0.2rem 0.4rem',
  },
})
