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
      green100: '#50B2C0',
      purple50: '#B2AFF0',
      purple80: '#7f7cff',
      purple100: '#8381D9',
      blue500: '#0E7490',
      blue600: '#486399',
      blue650: '#4E5C72',
      blue700: '#161D2F',
      blue800: '#10141E',
      blue900: '#0E1116',
    },
  },
})
