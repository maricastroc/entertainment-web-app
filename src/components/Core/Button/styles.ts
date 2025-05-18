// styles.ts
import { styled } from '@/styles'

export const StyledButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.7rem',
  cursor: 'pointer',
  padding: '0.875rem 0.6rem',
  fontSize: '$bodyMd',
  border: '1px solid transparent',
  width: '100%',
  transition: 'all 200ms ease',
  borderRadius: 8,

  svg: {
    transition: '200ms ease',
  },

  variants: {
    variant: {
      default: {
        color: '$gray300',
        backgroundColor: '$red300',
        transition: 'all 200ms ease',

        svg: {
          color: '$gray300',
        },

        '&:not(:disabled):hover': {
          color: '$blue800',
          backgroundColor: '$gray100',

          svg: {
            color: '$blue800',
          },
        },
      },

      'outline-white': {
        color: '$gray300',
        backgroundColor: 'transparent',
        border: '1px solid $gray300',
        transition: 'all 200ms ease',

        svg: {
          color: '$gray300',
        },

        '&:not(:disabled):hover': {
          color: '$gray100',
          backgroundColor: '$blue600',
          borderColor: '$blue600',

          svg: {
            color: '$red300',
          },
        },
      },

      'solid-white': {
        backgroundColor: '$gray300',
        border: '1px solid $gray300',
        transition: 'all 200ms ease',

        svg: {
          color: 'black',
        },

        '&:not(:disabled):hover': {
          color: '$gray100',
          backgroundColor: '$blue600',
          borderColor: '$blue600',

          svg: {
            color: '$gray300',
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },

  '&:disabled': {
    backgroundColor: '$blue600',
    border: 'solid 1px $blue600',
    color: '$gray100',
    cursor: 'not-allowed !important',
    pointerEvents: 'none',

    svg: {
      color: '$gray100',
    },
  },
})
