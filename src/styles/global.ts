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
    minHeight: '100vh',

    '@media (min-width: 1024px)': {
      overflowY: 'hidden',
    },

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
  },

  'body, input, textarea, button': {
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 500,
  },
})
