import { styled } from '@/styles'

export const OverlayBackground = styled('div', {
  position: 'fixed',
  width: '100vw',
  height: '100%',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
})

export const Wrapper = styled('div', {
  position: 'fixed',
  top: '0',
  right: '0',
  display: 'flex',
  zIndex: 998,
  overflow: 'scroll',
  width: '100%',
  maxWidth: '100%',
  height: '100%',
})
