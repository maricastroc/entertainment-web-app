import { styled } from '@/styles'

export const Container = styled('button', {
  position: 'absolute',
  top: '26px',
  right: '27px',
  transform: 'translate(50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '2rem',
  height: '2rem',
  marginLeft: '1rem',
  borderRadius: '50%',
  border: 'none',
  color: '$blue700',
  cursor: 'pointer',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  fontSize: '1.2rem',
  transition: '200ms ease',

  img: {
    marginTop: '0.55rem',
  },

  '&:focus, &:focus-visible': {
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  },

  '&:hover': {
    backgroundColor: '$gray100',

    img: {
      filter:
        'invert(90%) brightness(80%) sepia(100%) saturate(592%) hue-rotate(-50deg)',
    },
  },
})
