import { styled } from '@/styles'

export const StyledForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  width: '85vw',
  maxWidth: '27rem',
  height: 'auto',

  variants: {
    isLarger: {
      true: {
        maxWidth: '29rem',
      },
    },
  },
})
