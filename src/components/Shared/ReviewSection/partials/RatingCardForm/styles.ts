import { styled } from '@/styles'

export const RatingCardFormWrapper = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  backgroundColor: '$blue700',
  margin: '0.5rem auto 0',
  padding: '0.8rem 1rem',
  borderRadius: 8,
  width: '100%',

  '@media (min-width: 480px)': {
    padding: '1.5rem',
  },
})

export const RatingCardFormHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem',

  '@media (min-width: 580px)': {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '&.profile': {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export const UserDetailsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',

  p: {
    fontSize: '0.95rem',
  },
})

export const ReviewFormWrapper = styled('div', {
  position: 'relative',
  width: '100%',
})

export const ReviewForm = styled('textarea', {
  width: '100%',
  marginTop: '1rem',
  backgroundColor: '$blue800',
  padding: '0.875rem 0.875rem 1.25rem',
  border: 'solid 1px $blue600',
  borderRadius: 8,
  height: 188,
  minHeight: 80,
  color: '$gray300',
  lineHeight: '1.45rem',
  fontSize: '0.9rem',
  resize: 'vertical',

  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
})

export const FooterWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
})

export const CharacterCounterWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginLeft: '0.2rem',
})

export const CharacterCounter = styled('span', {
  fontSize: '0.75rem',
  color: '$gray100',
  padding: '0.2rem 0',
  marginBottom: '0.2rem',
})

export const UserActionsWrapper = styled('div', {
  marginTop: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  justifyContent: 'flex-end',
  width: '100%',
})

export const ActionButton = styled('button', {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: 8,
  backgroundColor: '$blue650',
  padding: '0.5rem',

  svg: {
    fontSize: '1.5rem',
  },

  '&:hover': {
    filter: 'brightness(1.2)',
    transition: '200ms',
  },

  '&.lighter': {
    backgroundColor: '$gray700',

    '&:hover': {
      filter: 'brightness(1.2)',
      transition: '200ms',
    },
  },

  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
})
