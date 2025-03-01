import { styled } from '@/styles'

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
