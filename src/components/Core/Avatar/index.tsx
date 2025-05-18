import { ImgHTMLAttributes } from 'react'
import { AvatarContainer, AvatarDefault } from './styles'
import AvatarDefaultImage from '../../.././../public/assets/avatar_mockup.png'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  avatarUrl?: string
  isClickable?: boolean
  variant?: '' | 'medium' | 'regular' | 'bigger' | 'large'
  onClick?: () => void
}

export function Avatar({
  avatarUrl,
  onClick,
  isClickable = false,
  variant = '',
}: AvatarProps) {
  return (
    <AvatarContainer
      className={variant}
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
      onClick={isClickable && onClick ? onClick : undefined}
    >
      {avatarUrl ? (
        <AvatarDefault
          className={`${variant} ${isClickable && 'clickable'}`}
          src={avatarUrl}
        />
      ) : (
        <AvatarDefault src={AvatarDefaultImage.src} />
      )}
    </AvatarContainer>
  )
}
