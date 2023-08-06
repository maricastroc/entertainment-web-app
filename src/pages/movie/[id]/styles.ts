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
  padding: '1rem',

  '@media (min-width: 640px)': {
    padding: '1.5rem',
  },

  '@media (min-width: 1024px)': {
    maxWidth: '87vw',
  },
})

export const MovieContainer = styled('div', {
  marginTop: '3rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
})

export const MovieContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '0 0.5rem 1.5rem',
})

export const MovieImage = styled('img', {
  width: '12rem',
  height: 'auto',
  borderRadius: 8,
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
})

export const Separator = styled('span', {
  width: '100%',
  height: 1.5,
  backgroundColor: '$blue700',
  margin: '1.5rem 0',
})

export const GeneralInfoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
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
})

export const GenresContent = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '0.6rem',
  width: '100%',
})

export const GenreItem = styled('div', {
  backgroundColor: '$gray300',
  color: '$blue800',
  padding: '0.2rem 0.4rem',
  borderRadius: 8,
  fontSize: '0.78rem',
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
})

export const LinksContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
})

export const LinkItem = styled('a', {
  backgroundColor: '$blue600',
  color: '$white',
  padding: '0.6rem 0.7rem',
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
})
