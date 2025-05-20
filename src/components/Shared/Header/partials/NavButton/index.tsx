import { StyledNavButton } from './styles'

import Image from 'next/image'
import { ReactNode } from 'react'
import { Tooltip } from 'react-tooltip'

interface NavButtonProps {
  icon: ReactNode
  active: boolean
  tooltipContent: string
  tooltipId: string
  onClick: () => void
}

export function NavButton({
  icon,
  active,
  tooltipContent,
  tooltipId,
  onClick,
}: NavButtonProps) {
  return (
    <>
      <StyledNavButton active={active}>
        <Image
          data-tooltip-id={tooltipId}
          data-tooltip-content={tooltipContent}
          src={icon as string}
          alt=""
          onClick={onClick}
        />
      </StyledNavButton>
      <Tooltip
        id={tooltipId}
        place="right"
        style={{ backgroundColor: '#26334F', border: 'solid 1px #D1D6E4' }}
      />
    </>
  )
}
