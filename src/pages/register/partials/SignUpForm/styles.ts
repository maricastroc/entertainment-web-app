import { styled } from '@/styles'

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$blue700',
  padding: '1.5rem',
  borderRadius: 20,
  width: '100%',
  gap: '1rem',

  h2: {
    alignSelf: 'flex-start',
    fontSize: '$headingLg',
    fontWeight: 300,
  },

  '@media (min-width: 480px)': {
    padding: '2rem',
  },
})

export const AvatarSection = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '1.25rem',
  marginBottom: '-0.5rem',
})

export const AvatarPreviewWrapper = styled('div', {
  position: 'relative',
  backgroundColor: 'transparent',
  width: '6rem',
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  alignItems: 'center',
  justifyContent: 'center',
})

export const AvatarPreview = styled('div', {
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

  p: {
    fontSize: '$bodySm',
    color: 'rgba(255, 255, 255, 0.5)',
    transition: '200ms ease',
  },

  img: {
    borderRadius: '50%',
    width: '3.5rem',
    height: '3.5rem',
    transition: '200ms ease',
    cursor: 'pointer',
    border: '1px solid $white',
  },

  '&:hover': {
    p: {
      color: '$white',
    },

    img: {
      filter: 'brightness(0.75)',
    },
  },

  '@media (min-width: 480px)': {
    width: '4rem',
    height: '4rem',

    img: {
      width: '4rem',
      height: '4rem',
    },
  },
})

export const AvatarUploadButton = styled('div', {
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: 'solid 1px $blue600',
  color: '$gray100',
  padding: '0.75rem 0.6rem',
  fontSize: '$bodyMd',

  input: {
    display: 'none',
  },

  button: {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '$bodyMd',
    cursor: 'pointer',
    border: 'none',
  },

  span: {
    marginLeft: '0.7rem',
  },
})
