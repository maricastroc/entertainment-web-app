import { styled } from '@/styles'

export const MainContent = styled('div', {
  paddingBottom: '3rem',

  '@media (min-width: 1024px)': {
    justifyContent: 'flex-start',
    maxWidth: '87vw',
    paddingRight: '1rem',
    maxHeight: '100vh',
    overflowY: 'scroll',
  },
})

export const MovieGenresContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',
  paddingBottom: '2rem',

  '@media (min-width: 415px)': {
    gridTemplateColumns: '1fr 1fr',

    '> :nth-last-child(-n + 1)': {
      gridColumn: 'span 2',
    },
  },

  '@media (min-width: 610px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',

    '> :nth-last-child(-n + 1)': {
      gridColumn: 'span 3',
    },
  },

  '@media (min-width: 815px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',

    '> :nth-last-child(-n + 3)': {
      gridColumn: 'span 2',
    },

    '> :nth-last-child(-n + 1)': {
      gridColumn: 'span 4',
    },
  },

  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(5, 1fr)',

    '> :nth-last-child(-n + 1)': {
      gridColumn: 'span 5',
    },
  },

  '@media (min-width: 1400px)': {
    gridTemplateColumns: 'repeat(6, 1fr)',

    '> :nth-last-child(-n + 3)': {
      gridColumn: 'span 1',
    },

    '> :nth-last-child(-n + 1)': {
      gridColumn: 'span 6',
    },
  },
})

export const TvGenresContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',
  paddingBottom: '2rem',

  '@media (min-width: 415px)': {
    gridTemplateColumns: '1fr 1fr',
  },

  '@media (min-width: 610px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',

    '> :nth-last-child(-n + 1)': {
      gridColumn: 'span 3',
    },
  },

  '@media (min-width: 815px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',

    '> :nth-last-child(-n + 1)': {
      gridColumn: 'span 1',
    },
  },

  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(5, 1fr)',

    '> :nth-last-child(-n + 1)': {
      gridColumn: 'span 5',
    },
  },

  '@media (min-width: 1400px)': {
    gridTemplateColumns: 'repeat(6, 1fr)',

    '> :nth-last-child(-n + 4)': {
      gridColumn: 'span 3',
    },
  },
})
