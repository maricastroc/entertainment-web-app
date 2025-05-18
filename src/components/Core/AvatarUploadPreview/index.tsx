import { AvatarUploadPreviewContainer, AvatarImage } from './styles'

interface AvatarUploadPreviewProps {
  avatarPreview?: string | null
  defaultImage: string
  onClick: () => void
}

export function AvatarUploadPreview({
  avatarPreview,
  defaultImage,
  onClick,
}: AvatarUploadPreviewProps) {
  return (
    <AvatarUploadPreviewContainer onClick={onClick}>
      <AvatarImage
        src={avatarPreview || defaultImage}
        alt={avatarPreview ? 'Avatar Preview' : 'Default Avatar'}
        isDefault={!avatarPreview}
      />
    </AvatarUploadPreviewContainer>
  )
}
