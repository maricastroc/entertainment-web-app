import { styled } from '@/styles'

export const GeneralInfoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  margin: '1rem 0',

  '@media (min-width: 768px)': {
    justifyContent: 'flex-start',
    gap: '1.5rem',
  },
})

export const GeneralInfoItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.3rem',
  width: '4.9rem',

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
      display: '-webkit-box',
      '-webkit-line-clamp': 2, // Limita a 2 linhas
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis', // Adiciona reticências
      wordBreak: 'break-word', // Quebra palavras longas
      maxWidth: '100%',
    },
  },
})
