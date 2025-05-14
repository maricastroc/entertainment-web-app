import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  backgroundColor: '$blue700',
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.2)',
  padding: '1.2rem',
  borderRadius: 8,
  width: '100%',

  '@media (min-width: 580px)': {
    padding: '1.5rem 1.5rem 1rem',
  },
})

export const Header = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '0.9rem',

  '@media (min-width: 580px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export const UserInfoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '0.8rem',
  width: '100%',
})

export const UserInfoData = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '0.2rem',
  width: '100%',

  span: {
    fontSize: '0.8rem',
    color: '$gray400',
  },
})

export const Content = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  color: '$gray300',
  lineHeight: '1.4rem',
  fontSize: '0.9rem',
  wordBreak: 'break-word',
  paddingRight: '0.3rem',
  fontWeight: 300,
  maxHeight: '8rem',
  marginTop: '1.2rem',
  overflowY: 'scroll',
  overflowX: 'hidden',

  a: {
    color: '$gray300',
  },

  '@media (min-width: 580px)': {
    fontSize: '0.85rem',
  },

  '@media (min-width: 1024px)': {
    fontWeight: 300,
    color: '$gray100',
  },
})

export const Footer = styled('div', {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '0.7rem',
  borderRadius: 8,
})

export const RatingActions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  paddingRight: '1rem',
  width: '100%',
  gap: '0.6rem',
  marginTop: '0.5rem',
  borderRadius: 8,

  svg: {
    cursor: 'pointer',
    fontSize: '1rem',
    color: '$gray400',

    '&:hover': {
      filter: 'brightness(1.8)',
      transition: '200ms ease-in-out',
    },
  },
})

export const RatingWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',

  p: {
    fontSize: '0.85rem',
  },
})

export const DropdownButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.6rem',
  width: '2rem',
  height: '2rem',
  backgroundColor: 'transparent',
  borderRadius: '100%',
  borderColor: 'transparent',
  transition: 'all 200ms',
  cursor: 'pointer',

  '&:focus, &:focus-visible': {
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  },

  svg: {
    fontSize: '1rem',
    color: '$gray100',
  },

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
})

export const Dropdown = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  position: 'absolute',
  border: '1px solid rgba(126, 147, 188, 0.5)',
  borderRadius: 8,
  width: '8.6rem',
  backgroundColor: '$blue700',
  padding: '0.9rem 0',
  gap: '0.6rem',
  right: '0%',
  top: '100%',
})

export const DropdownItem = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
  fontSize: '0.88rem',
  color: '$gray200',
  marginLeft: '0.6rem',
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  cursor: 'pointer',

  p: {
    color: '$gray200',
  },

  svg: {
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: '$gray400',

    '&.edit_icon': {
      color: '$green500',
      filter: 'brightness(1.5)',
    },

    '&.delete_icon': {
      color: '$red300',
      filter: 'brightness(1.5)',
    },
  },

  '&:hover': {
    color: '$gray100',

    svg: {
      filter: 'brightness(1.8)',
      transition: '200ms ease-in-out',
    },
  },
})
