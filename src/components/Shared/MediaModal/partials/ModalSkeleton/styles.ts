import { styled } from '@/styles'

export const MediaContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '$blue700',
  borderRadius: '12px',
  gap: '1rem',
  padding: '1.5rem',
  alignItems: 'center',
  width: '100%',

  '@media (min-width: 680px)': {
    padding: '2rem',
  },
})

export const MediaWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.8rem',

  '@media (min-width: 680px)': {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
})

export const InfoContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
})

export const DetailsContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
})

export const TitleContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',

  '@media (min-width: 680px)': {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '100%',
  },
})

export const TitleContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',

  '@media (min-width: 680px)': {
    alignItems: 'flex-start',
  },
})

export const OtherInfoContent = styled('div', {
  marginTop: '1.7rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.7rem',
})

export const Separator = styled('span', {
  width: '100%',
  height: 1.5,
  backgroundColor: '$blue600',
  margin: '0.4rem 0',
  opacity: 0.3,

  '@media (min-width: 680px)': {
    display: 'none',
  },
})

export const ReviewsSection = styled('div', {
  marginTop: '1.7rem',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'center',
})

export const ReviewItem = styled('div', {
  marginTop: '1.3rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '$blue700',
  borderRadius: '12px',
  gap: '1rem',
  padding: '1.5rem',
  alignItems: 'center',
  width: '100%',

  '@media (min-width: 680px)': {
    padding: '2rem',
  },
})
