import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto',
})

export const FormWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$blue700',
  padding: '1.5rem',
  borderRadius: 20,
  width: '100%',
  gap: '1rem',

  h2: {
    alignSelf: 'flex-start',
    fontSize: '1.6rem',
    fontWeight: 300,
  },

  '@media (min-width: 480px)': {
    padding: '2rem',

    h2: {
      fontSize: '$headingLg',
    },
  },
})
