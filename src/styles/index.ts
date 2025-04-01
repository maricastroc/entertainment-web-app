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
      gray400: '#AFB3BC',

      red300: '#FC4747',

      green400: '#1595AA',
      green500: '#0F766E',

      purple100: '#8381D9',

      blue400: '#7E93BC',
      blue600: '#5A698F',
      blue650: '#26334F',
      blue700: '#161D2F',
      blue800: '#10141E',
    },

    fontSizes: {
      headingLg: '2rem',
      headingMd: '1.5rem',
      headingXs: '1.125rem',
      bodyMd: '0.9375rem',
      bodySm: '0.8125rem',
    },
  },
})
