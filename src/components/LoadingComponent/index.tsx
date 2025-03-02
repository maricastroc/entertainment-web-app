import { ThreeDots } from 'react-loading-icons'
import { OverlayBackground, Wrapper } from './styles'

interface Props {
  hasOverlay?: boolean
  withBackground?: boolean
}

export const LoadingComponent = ({
  hasOverlay = false,
  withBackground = false,
}: Props) => {
  return (
    <Wrapper>
      {hasOverlay && <OverlayBackground withBackground={withBackground} />}
      <ThreeDots height={'12px'} className="animate-spin" />
    </Wrapper>
  )
}
