import { styled } from '@/styles'

export const AvatarContainer = styled('div', {
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 33,
  height: 33,
  borderRadius: '50%',
  background: '$blue900',

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
