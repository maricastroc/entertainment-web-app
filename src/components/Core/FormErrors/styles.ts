import { styled } from '@/styles'

export const StyledFormErrors = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.4rem',
  marginTop: '0.3rem',

  svg: {
    color: '$red300',
    fontSize: '0.8rem',
  },

  p: {
    color: '$gray300',
    fontSize: '$bodySm',
  },
})

export const ErrorContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
})
