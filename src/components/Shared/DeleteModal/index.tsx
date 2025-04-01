import * as Dialog from '@radix-ui/react-dialog'
import {
  Overlay,
  Header,
  Description,
  Title,
  Content,
  CloseButton,
} from './styles'
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
      <Overlay className="DialogOverlay" onClick={() => onClose()} />
      <Content className="DialogContent">
        <Header>
          <CloseButton onClick={() => onClose()}>
            <X size={18} alt="Delete Review" />
          </CloseButton>
          <Title className="DialogTitle">{`Delete this review?`}</Title>
        </Header>
        <Description className="DialogDescription">
          Are you sure you want to delete this review? This action cannot be
          reversed.
        </Description>
        <Button
          style={{ marginTop: '2rem' }}
          content="Confirm & Delete"
          disabled={isLoading}
          onClick={() => onConfirm()}
        />
      </Content>
    </Dialog.Portal>
  )
}
