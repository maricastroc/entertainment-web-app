import { styled } from '@/styles'

export const SocialIconsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  gap: '1rem',
  padding: '1rem 0 0',

  svg: {
    fontSize: '1.2rem',
  },
})

export const SocialIconLink = styled('a', {
  color: '$white',
  transition: 'color 0.2s',

  '&:hover': {
    color: '$green400',
  },
})
