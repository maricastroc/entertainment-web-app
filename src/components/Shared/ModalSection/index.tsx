import MediaModal from '@/components/Shared/MediaModal'
import PersonModal from '@/components/Shared/PersonModal'

export function ModalSection({
  isOpen,
  mediaType,
  selectedId,
  openPersonModal,
  onClose,
  onChangeMedia,
}: {
  isOpen: boolean
  mediaType: string
  selectedId: string
  openPersonModal: boolean
  onClose: () => void
  onChangeMedia: (type: string, id: string) => void
}) {
  if (!isOpen || !selectedId) return null

  return openPersonModal ? (
    <PersonModal
      mediaType={mediaType}
      id={selectedId}
      handleClickMedia={onChangeMedia}
      onClose={onClose}
    />
  ) : (
    <MediaModal
      media_type={mediaType}
      id={selectedId}
      onClose={onClose}
      handleClickMedia={onChangeMedia}
    />
  )
}
