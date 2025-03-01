import { styled } from '@/styles'

export const LinksContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
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
  cursor: 'pointer',

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
    border: '1px solid transparent',
    transition: 'all 200ms',
  },
})
