import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  css,
} = createStitches({
  theme: {
    colors: {
      white: '#FFFFFF',
      gray100: '#F8F9FC',
      gray300: '#D1D6E4',

      red300: '#FC4747',

      green500: '#0F766E',

      blue500: '#0E7490',
      blue600: '#5A698F',
      blue700: '#161D2F',
      blue800: '#10141E',
    },
  },
})
