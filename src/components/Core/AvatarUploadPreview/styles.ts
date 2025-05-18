import { styled } from '@/styles'

export const AvatarUploadPreviewContainer = styled('div', {
  position: 'relative',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px $blue600',
  color: '$gray100',
  padding: '0.4rem 0.6rem',
  borderRadius: '50%',
  width: '3.5rem',
  height: '3.5rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    transform: 'scale(1.05)',
  },

  img: {
    minWidth: '3.5rem',
    minHeight: '3.5rem',
    maxWidth: '3.5rem',
    maxHeight: '3.5rem',
  },

  '@media (min-width: 480px)': {
    minWidth: '4rem',
    minHeight: '4rem',

    img: {
      minWidth: '4rem',
      minHeight: '4rem',
      maxWidth: '4rem',
      maxHeight: '4rem',
    },
  },
})

export const AvatarImage = styled('img', {
  borderRadius: '50%',
  transition: '200ms ease',
  cursor: 'pointer',
  border: '1px solid $gray300',
  objectFit: 'cover',
  variants: {
    isDefault: {
      true: {
        opacity: '0.6',
        filter: 'brightness(0.8)',
        borderColor: 'transparent',
      },
    },
  },
})

export const AddButton = styled('button', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'transparent',
  border: 'none',
  color: '$gray200',
  fontSize: '1.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '$primary500',

  '&:hover': {
    backgroundColor: '$primary600',
  },
})
