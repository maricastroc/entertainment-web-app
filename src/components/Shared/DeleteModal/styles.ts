import { styled } from '@/styles'

import { Overlay as RadixOverlay } from '@radix-ui/react-dialog'

export const ModalOverlay = styled(RadixOverlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  zIndex: 9998,
  backgroundColor: 'rgba(10, 10, 10, 0.2)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
})
