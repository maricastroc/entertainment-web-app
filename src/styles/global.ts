import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',

    ':focus': {
      outline: 'transparent',
      boxShadow: '0 0 0 2px rgba(90, 105, 143, 1)',
    },
  },

  body: {
    backgroundColor: '$blue800',
    color: '$white',
    '-webkit-font-smoothing': 'antialiased',
    height: '100%',

    '*::-webkit-scrollbar': {
      width: 2,
      height: 2,
      borderRadius: 9999,
    },

    '*::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },

    '*::-webkit-scrollbar-thumb': {
      width: 6,
      backgroundColor: '$blue600',
      borderRadius: 80,
      boxShadow: 'inset 0 0 0px 6px $blue600',
      border: '10px solid transparent',
    },

    input: {
      colorScheme: 'dark !important',
    },
  },

  'body, input, textarea, button': {
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 300,

    '&::placeholder': {
      color: '$gray400',
    },
  },

  'input:-webkit-autofill': {
    backgroundColor: '$blue700 !important',
    '-webkit-text-fill-color': 'white !important',
    '-webkit-box-shadow': '0 0 0px 1000px $blue700 inset !important',
    transition: 'background-color 5000s ease-in-out 0s !important',
  },
  'input:-webkit-autofill:hover': {
    backgroundColor: '$blue700 !important',
    '-webkit-text-fill-color': 'white !important',
    '-webkit-box-shadow': '0 0 0px 1000px $blue700 inset !important',
  },
  'input:-webkit-autofill:focus': {
    backgroundColor: '$blue700 !important',
    '-webkit-text-fill-color': 'white !important',
    '-webkit-box-shadow': '0 0 0px 1000px $blue700 inset !important',
  },
  '& textarea:-webkit-autofill': {
    backgroundColor: '$blue700',
    '-webkit-text-fill-color': '$gray300',
    '-webkit-box-shadow': '0 0 0px 1000px #000 inset',
    transition: 'background-color 5000s ease-in-out 0s',
  },
  '& select:-webkit-autofill': {
    backgroundColor: '$blue700',
    '-webkit-text-fill-color': '$gray300',
    '-webkit-box-shadow': '0 0 0px 1000px #000 inset',
    transition: 'background-color 5000s ease-in-out 0s',
  },

  button: {
    '&:focus': {
      backgroundColor: 'transparent',
      outline: 'none',
      boxShadow: 'none',
    },
  },
})
