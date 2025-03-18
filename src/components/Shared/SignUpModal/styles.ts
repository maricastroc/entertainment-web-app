import { styled } from '@/styles'

import {
  Content as RadixContent,
  Title as RadixTitle,
  Close as RadixClose,
  Overlay as RadixOverlay,
  Description as RadixDescription,
} from '@radix-ui/react-dialog'

export const Overlay = styled(RadixOverlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  zIndex: 9997,
  backgroundColor: 'rgba(10, 10, 10, 0.7)',
})

export const Description = styled(RadixDescription, {
  fontSize: '0.9rem',
  width: '100%',
  marginTop: '1rem',
  textAlign: 'left',
  color: '$gray300',
  lineHeight: '180%',
})

export const Content = styled(RadixContent, {
  padding: '1.5rem 1rem 3rem',
  backgroundColor: '$blue800',
  color: '$gray300',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'clamp(300px, 80vw, 300px)',
  borderRadius: '4px',
  zIndex: 9998,
  overflow: 'scroll',
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',
  height: '100%',

  '@media (min-width: 480px)': {
    width: 'clamp(300px, 85vw, 460px)',
    height: 'clamp(20rem, 80vh, 100%)',
  },

  '@media (min-width: 768px)': {
    padding: '2rem',
    width: 'clamp(20rem, 80vw, 40rem)',
    height: 'clamp(20rem, 80vh, 100%)',
  },

  '@media (min-width: 1025px)': {
    height: 'clamp(35rem, 80vh, 100%)',
  },
})

export const Title = styled(RadixTitle, {
  color: '$gray100',
  fontSize: '1rem',
  textAlign: 'start',
  width: '80%',
  marginBottom: '1rem',

  '@media (min-width: 480px)': {
    marginBottom: 0,
    fontSize: '1.1rem',
  },
})

export const Header = styled('div', {
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '2rem',

  '@media (min-width: 480px)': {
    alignItems: 'center',
  },
})

export const CloseButton = styled(RadixClose, {
  color: '$gray300',
  fontWeight: '700',
  display: 'flex',
  width: '1.5rem',
  justifyContent: 'flex-end',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: '0',
  marginTop: '0.1rem',

  svg: {
    color: '$gray300',
    fontSize: '1.3rem',
  },

  '&:hover': {
    transition: '200ms ease',

    svg: {
      filter: 'brightness(1.2)',
    },
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $blue600',
  },

  '@media (min-width: 480px)': {
    marginTop: 0,
  },
})

export const FormContainer = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '100%',
  alignItems: 'center',
})

export const AvatarSectionContainer = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  marginBottom: 0,
  gap: '2rem',

  '@media (min-width: 480px)': {
    marginBottom: '1.5rem',
    flexDirection: 'row',
    gap: 0,
    justifyContent: 'space-between',
  },
})

export const PreviewContainer = styled('div', {
  position: 'relative',
  backgroundColor: 'transparent',
  width: '6rem',
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  alignItems: 'center',
  justifyContent: 'center',

  '@media (min-width: 480px)': {
    width: '10rem',
  },
})

export const ImagePreview = styled('div', {
  position: 'relative',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px $blue600',
  color: '$gray100',
  padding: '0.4rem 0.6rem',
  borderRadius: '50%',
  width: '6rem',
  height: '6rem',

  svg: {
    width: '3rem',
    height: '3rem',
    color: '$blue600',
  },

  img: {
    borderRadius: '50%',
    width: '6rem',
    height: '6rem',
  },
})

export const EditBtn = styled('button', {
  position: 'absolute',
  cursor: 'pointer',
  top: '73%',
  left: '72%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray100',
  border: 'solid 1px $gray500',
  borderRadius: '50%',
  color: '$gray100',
  width: '1.7rem',
  height: '1.7rem',

  svg: {
    borderRadius: '50%',
    color: '$gray600',
    width: '1.2rem',
    height: '1.2rem',
  },

  '@media (min-width: 480px)': {
    top: '73%',
    left: '58%',
  },
})

export const ImageInput = styled('div', {
  backgroundColor: 'transparent',
  border: 'solid 1px $blue600',
  color: '$gray100',
  padding: '0.4rem 0.6rem',
  fontSize: '0.95rem',
  borderRadius: 10,

  input: {
    display: 'none',
  },

  button: {
    backgroundColor: '$gray600',
    color: '$gray100',
    padding: '0.2rem 0.7rem',
    cursor: 'pointer',
    borderRadius: 8,
    fontSize: '0.8rem',
    border: 'none',

    '&:hover': {
      transition: '200ms ease',
      filter: 'brightness(1.2)',

      svg: {
        backgroundColor: '$blue600',
      },
    },
  },

  span: {
    marginLeft: '0.7rem',
  },
})

export const Input = styled('input', {
  backgroundColor: 'transparent',
  border: 'solid 1px $blue600',
  color: '$gray100',
  padding: '0.75rem 0.6rem',
  fontSize: '0.95rem',
  borderRadius: 10,

  '&:-webkit-autofill': {
    backgroundColor: 'transparent !important',
    boxShadow: '0 0 0px 1000px transparent inset !important',
  },
  '&:-moz-placeholder': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-input-placeholder': {
    backgroundColor: 'transparent',
  },
})

export const ImageInputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem',
  width: '100%',
})

export const ChangePasswordInputContainer = styled('div', {
  display: 'flex',
  gap: '0.6rem',
  width: '100%',
  alignItems: 'center',
})
