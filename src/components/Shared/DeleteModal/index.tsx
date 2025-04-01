import * as Dialog from '@radix-ui/react-dialog'
import {
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from '@/styles/shared'
import { X } from 'phosphor-react'
import { Button } from '@/components/Core/Button'
import { useAppContext } from '@/contexts/AppContext'

interface DeleteModalProps {
  onConfirm: () => void
  onClose: () => void
}

export function DeleteModal({ onConfirm, onClose }: DeleteModalProps) {
  const { isLoading } = useAppContext()

  return (
    <Dialog.Portal>
      <ModalOverlay className="DialogOverlay" onClick={() => onClose()} />
      <ModalContent className="DialogContent">
        <ModalHeader>
          <ModalTitle className="DialogTitle">{`Delete this review?`}</ModalTitle>
          <ModalCloseButton onClick={() => onClose()}>
            <X size={18} alt="Delete Review" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalDescription className="DialogDescription">
          Are you sure you want to delete this review? This action cannot be
          reversed.
        </ModalDescription>
        <Button
          style={{ marginTop: '2rem' }}
          content="Confirm & Delete"
          disabled={isLoading}
          onClick={() => onConfirm()}
        />
      </ModalContent>
    </Dialog.Portal>
  )
}
