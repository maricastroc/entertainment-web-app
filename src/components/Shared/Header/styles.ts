import { styled } from '@/styles'

export const Container = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: '$blue700',
  padding: '1.5rem',
  position: 'sticky',
  top: 0,
  zIndex: 10,

  '> svg': {
    fontSize: '1.6rem',
    color: '$red300',
  },

  '@media (min-width: 768px)': {
    margin: '1.5rem 1.5rem 0.5rem',
    borderRadius: 8,
    width: 'auto',
  },

  '@media (min-width: 1024px)': {
    flexDirection: 'column',
    padding: '2.1rem',
    height: '90vh',
    margin: '2rem',
    width: 96,

    '> svg': {
      fontSize: '1.8rem',
    },
  },
})

export const ButtonPagesContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',

  svg: {
    cursor: 'pointer',
    color: '$blue600',
    fontSize: '1.2rem',

    variants: {
      active: {
        true: {
          color: '$gray100',
        },
      },
    },

    '&:hover': {
      color: '$red300',
      transition: 'all 200ms',
    },
  },

  '@media (min-width: 480px)': {
    gap: '2.5rem',
  },

  '@media (min-width: 1024px)': {
    flexDirection: 'column',

    svg: {
      fontSize: '1.4rem',
    },
  },
})

export const ButtonPage = styled('button', {
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

export const AuthButton = styled('div', {
  display: 'flex',
  position: 'absolute',
  top: '200%',
  right: '100%',
  transform: 'translate(50%, -50%)',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  width: '5.7rem',
  height: '2.8rem',
  backgroundColor: '$blue700',
  gap: '0.3rem',

  p: {
    fontSize: '$bodyMd',
    color: '$gray300',
  },

  svg: {
    fontSize: '$bodyMd',
  },

  '@media (min-width: 1024px)': {
    top: '50%',
    left: '50%',
  },

  '&:hover': {
    p: {
      filter: 'brightness(1.2)',
      transition: '200ms ease',
    },

    svg: {
      filter: 'brightness(1.4)',
      transition: '200ms ease',
    },
  },
})

export const AvatarContainer = styled('a', {
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 33,
  height: 33,
  borderRadius: '50%',
  background: '$gray300',

  '@media (min-width: 1024px)': {
    width: 40,
    height: 40,
  },

  img: {
    objectFit: 'cover',
    borderRadius: '50%',
    width: 32,
    height: 32,
    aspectRatio: 'auto 40 / 40',

    '@media (min-width: 1024px)': {
      width: 38,
      height: 38,
    },
  },
})
