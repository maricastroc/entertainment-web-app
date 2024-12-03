import { styled } from '../../../styles'

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100vw',

  '@media (min-width: 1024px)': {
    flexDirection: 'row',
  },
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem 1rem 2rem',
  width: '100%',

  '@media (min-width: 480px)': {
    padding: '0 2rem 0',
  },

  '@media (min-width: 640px)': {
    padding: '0 2rem 0',
  },

  '@media (min-width: 980px)': {
    padding: '1rem 3rem 1.5rem',
  },

  '@media (min-width: 1024px)': {
    maxWidth: '87vw',
  },

  '@media (min-width: 1200px)': {
    maxWidth: '87vw',
    padding: '1rem 2rem 1.5rem',
  },
})

export const MovieContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',

  '@media (min-width: 768px)': {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '1.5rem',
    margin: '0 auto 0',
  },

  '@media (min-width: 980px)': {
    gap: '2.5rem',
    justifyContent: 'space-between',
  },

  '@media (min-width: 1024px)': {
    overflowY: 'scroll',
    maxHeight: '75vh',
    justifyContent: 'flex-start',
    paddingBottom: 0,
  },

  '@media (min-width: 1200px)': {
    gap: '4rem',
    justifyContent: 'space-between',
  },
})

export const MovieContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '0 0.5rem 0',
  paddingBottom: '3rem',

  '@media (min-width: 580px)': {
    padding: '0 2rem 0',
    paddingBottom: '3rem',
  },

  '@media (min-width: 768px)': {
    padding: '0 0.5rem 0',
    paddingBottom: '3rem',
    alignItems: 'flex-start',
  },
})

export const MovieImage = styled('img', {
  width: 'clamp(10rem, 40vw, 16rem)',
  height: 'auto',
  borderRadius: 8,

  '@media (min-width: 768px)': {
    width: 'clamp(16rem, 40vw, 21rem)',
  },

  '@media (min-width: 980px)': {
    width: 'clamp(16rem, 40vw, 20rem)',
  },

  '@media (min-width: 1200px)': {
    width: 'clamp(16rem, 40vw, 21.6rem)',
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
    fontSize: '1.8rem',
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
      fontSize: '2rem',
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

  '@media (min-width: 1024px)': {
    '> h2': {
      fontSize: '2.5rem',
    },

    '> p': {
      fontSize: '1.05rem',
    },
  },
})

export const RatingContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.3rem',

  '> h2': {
    fontSize: '2rem',
    fontWeight: 500,
    color: '$gray300',
  },

  '@media (min-width: 580px)': {
    '> h2': {
      fontSize: '2.3rem',
    },
  },

  '@media (min-width: 768px)': {
    marginTop: '1.5rem',

    '> h2': {
      fontSize: '2.1rem',
    },
    flexDirection: 'row',
    gap: '1rem',
  },
})

export const Separator = styled('span', {
  width: '100%',
  height: 1.5,
  backgroundColor: '$blue700',
  margin: '1.5rem 0',

  '@media (min-width: 768px)': {
    display: 'none',
  },
})

export const GeneralInfoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',

  '@media (min-width: 768px)': {
    marginTop: '1.5rem',
    justifyContent: 'flex-start',
    gap: '2.5rem',
  },
})

export const GeneralInfoItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.3rem',

  '> h2': {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '$gray300',
    opacity: 0.8,
  },

  '> p': {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '$gray100',
  },

  '@media (min-width: 580px)': {
    '> h2': {
      fontSize: '0.95rem',
    },

    '> p': {
      fontSize: '0.95rem',
    },
  },

  '@media (min-width: 1200px)': {
    '> h2': {
      fontSize: '1.05rem',
    },

    '> p': {
      fontSize: '1.05rem',
    },
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
    fontSize: '1rem',
    fontWeight: 500,
    color: '$gray100',
  },

  '@media (min-width: 580px)': {
    '> h2': {
      fontSize: '1.2rem',
    },
  },

  '@media (min-width: 768px)': {
    margin: '2rem 0 1rem',
  },
})

export const GenresContent = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '0.6rem',
  width: '100%',

  '@media (min-width: 768px)': {
    gap: '1.2rem',
  },
})

export const GenreItem = styled('div', {
  backgroundColor: '$gray300',
  color: '$blue800',
  padding: '0.2rem 0.4rem',
  borderRadius: 8,
  fontSize: '0.78rem',

  '@media (min-width: 580px)': {
    fontSize: '0.9rem',
    padding: '0.25rem 0.5rem',
  },
})

export const SynopsisContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '0.6rem',
  width: '100%',

  '> h2': {
    fontSize: '1rem',
    fontWeight: 500,
    color: '$gray100',
  },

  '> p': {
    fontSize: '0.85rem',
    fontWeight: 300,
    color: '$gray100',
    lineHeight: '1.3rem',
  },

  '@media (min-width: 580px)': {
    '> h2': {
      fontSize: '1.2rem',
    },

    '> p': {
      fontSize: '0.95rem',
      lineHeight: '1.6rem',
    },
  },

  '@media (min-width: 1024px)': {
    maxWidth: '45rem',

    '> h2': {
      fontSize: '1.4rem',
    },

    '> p': {
      fontSize: '1rem',
      fontWeight: 300,
      color: '$gray100',
      lineHeight: '1.6rem',
    },
  },
})

export const LinksContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',

  '@media (min-width: 768px)': {
    justifyContent: 'flex-start',
    marginTop: '2rem',
  },
})

export const LinkItem = styled('a', {
  backgroundColor: '$blue600',
  color: '$white',
  padding: '0.6rem 0.7rem',
  border: '2px solid transparent',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  width: '6.2rem',
  justifyContent: 'space-between',
  textDecoration: 'none',

  '> span': {
    fontSize: '0.85rem',
    fontWeight: 500,
    textDecoration: 'none',
  },

  svg: {
    width: '1rem',
  },

  '&:hover': {
    backgroundColor: 'transparent',
    border: '2px solid $blue600',
    transition: 'all 200ms',
  },
})
