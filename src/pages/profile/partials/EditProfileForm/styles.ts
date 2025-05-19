import { styled } from '@/styles'

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: '1.3rem',
  paddingBottom: '1rem',
  backgroundColor: '$blue700',
  padding: '1.5rem',
  borderRadius: 20,
  height: 'auto',

  variants: {
    expandForm: {
      true: {
        height: 'auto',
      },
    },
  },

  '@media (min-width: 480px)': {
    padding: '2rem',
  },

  '@media (min-width: 680px)': {
    padding: '3rem',
  },
})

export const InputWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  gap: '0.65rem',

  p: {
    fontSize: '0.85rem',
  },
})
