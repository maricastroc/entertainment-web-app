import Loading from '../Loading'
import { OverlayBackground, Wrapper } from './styles'

interface Props {
  hasOverlay?: boolean
}

export const LoadingComponent = ({ hasOverlay = false }: Props) => {
  return (
    <Wrapper>
      {hasOverlay && <OverlayBackground />}
      <Loading />
    </Wrapper>
  )
}
