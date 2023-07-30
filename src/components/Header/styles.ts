import { styled } from '../../styles'

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
  borderRadius: 8,

  '> svg': {
    fontSize: '1.6rem',
    color: '$red300',
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
    color: '$blue600',
    fontSize: '1.2rem',

    variants: {
      active: {
        true: {
          svg: {
            color: '$red300',
          },
        },
      },
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

export const AvatarContainer = styled('a', {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: '$white',

  '@media (min-width: 1024px)': {
    width: 30,
    height: 30,
  },
})

export const AvatarImage = styled('img', {
  overflow: 'hidden',
  objectFit: 'cover',
  borderRadius: '50%',
  width: 26,
  aspectRatio: 'auto 40 / 40',
  height: 26,

  '@media (min-width: 1024px)': {
    width: 28,
    height: 28,
  },
})
