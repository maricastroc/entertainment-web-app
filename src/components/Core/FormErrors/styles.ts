import { styled } from '@/styles'

export const StyledFormErrors = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.4rem',

  span: {
    color: '$red300',
    fontSize: '$bodySm',
  },
})
