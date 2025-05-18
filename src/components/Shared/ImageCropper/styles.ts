import { styled } from '@/styles'

export const CropperWrapper = styled('div', {
  height: 400,
  width: '100%',
  backgroundColor: '$blue800',

  '.cropper-container': {
    backgroundImage: '$blue700',
    borderRadius: '16px',
  },

  '.cropper-bg': {
    backgroundImage: '$blue700',
    borderRadius: '16px',
  },

  '.cropper-modal': {
    backgroundColor: '$blue700',
    borderRadius: '16px',
  },
})

export const ButtonGroup = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.5rem',
  marginTop: '2rem',
  width: '100%',
})
