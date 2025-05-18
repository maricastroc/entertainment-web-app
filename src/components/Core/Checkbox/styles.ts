import { styled } from '@/styles'

export const CheckboxContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
})

export const CheckboxLabel = styled('label', {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
})

export const HiddenCheckbox = styled('input', {
  position: 'absolute',
  opacity: 0,
  height: 0,
  width: 0,
})

export const StyledCheckbox = styled('div', {
  display: 'flex',
  border: '1px solid $blue400',
  height: '18px',
  width: '18px',
  borderRadius: '4px',
  marginRight: '8px',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 150ms',

  '&:hover': {
    borderColor: '$blue400',
  },
})

export const CheckboxText = styled('p', {
  fontSize: '14px',
  color: '$gray100',
})
