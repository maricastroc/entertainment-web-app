import { styled } from '@/styles'
import { keyframes } from '@stitches/react'

const entranceAnimation = keyframes({
  from: {
    translate: '100%',
  },
  to: {
    translate: '0%',
  },
})

export const LateralMenuWrapper = styled('section', {
  position: 'fixed',
  top: '0',
  right: '0',
  display: 'flex',
  justifyContent: 'flex-end',
  zIndex: 998,
  overflow: 'scroll',
  width: '100%',
  maxWidth: '100%',
  height: '100%',

  '@media (min-width: 680px)': {
    maxWidth: '35rem',
  },

  '@media (min-width: 768px)': {
    maxWidth: '41.5rem',
  },
})

export const OverlayBackground = styled('div', {
  position: 'fixed',
  width: '100vw',
  height: '100%',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
})

export const CloseButton = styled('button', {
  cursor: 'pointer',
  position: 'absolute',
  zIndex: 1,
  top: '9%',
  left: '89%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '$blue800',
  border: '1px solid $gray300',
  color: '$gray300',
  padding: '0.2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  opacity: 0.7,

  svg: {
    fontSize: '1.2rem',
    color: '$gray400',
  },

  '@media (min-width: 580px)': {
    top: '6%',
    left: '92%',
  },
})

export const Wrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  backgroundColor: '$blue800',
  border: 'none',
  height: '100%',
  overflow: 'scroll',
  width: '100%',
  padding: '2rem 1.5rem 2.5rem',
  borderRadius: 8,
  animation: `${entranceAnimation} 0.4s`,

  '@media (min-width: 768px)': {
    padding: '2.5rem',
  },

  '@media (min-width: 1024px)': {
    flexDirection: 'row',
  },
})

export const MovieContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
})

export const MovieContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '$blue700',
  borderRadius: '12px',
  padding: '1.5rem',
  alignItems: 'center',
  width: '100%',

  '@media (min-width: 768px)': {
    padding: '2rem',
  },
})

export const MovieInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',

  '@media (min-width: 768px)': {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: '1.5rem',
  },
})

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

export const MovieImage = styled('img', {
  width: 'clamp(10rem, 40vw, 16rem)',
  height: 'auto',
  borderRadius: 8,
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',

  '@media (min-width: 768px)': {
    width: 'clamp(12rem, 40vw, 12rem)',
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

export const GeneralInfoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',

  '@media (min-width: 768px)': {
    marginTop: '1.5rem',
    justifyContent: 'flex-start',
    gap: '1.5rem',
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

export const SynopsisContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',

  '> p': {
    fontSize: '0.85rem',
    fontWeight: 300,
    color: '$gray100',
    lineHeight: '1.4rem',
    maxHeight: '8.2rem',
    overflowY: 'scroll',
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

export const ReviewsContainer = styled('div', {
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
  },
})

export const LinkItem = styled('a', {
  color: '$white',
  padding: '0.6rem 0.7rem',
  backgroundColor: 'transparent',
  border: '1px solid $blue600',
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
    backgroundColor: '$blue600',
    border: '2px solid transparent',
    transition: 'all 200ms',
  },
})

export const SimilarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  marginTop: '2rem',

  '> h2': {
    fontSize: '1.2rem',
    fontWeight: 300,
    color: '$gray100',
  },

  '> p': {
    fontSize: '0.85rem',
    fontWeight: 300,
    color: '$gray100',
    lineHeight: '1.3rem',
  },

  '@media (min-width: 1024px)': {
    maxWidth: '45rem',

    '> p': {
      fontSize: '1rem',
      fontWeight: 300,
      color: '$gray100',
      lineHeight: '1.6rem',
    },
  },
})

export const SimilarContent = styled('div', {
  display: 'flex',
  overflowX: 'scroll',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '$blue700',
  borderRadius: '12px',
  padding: '1.5rem',
  gap: '1.5rem',
  width: '100%',
})
