import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'

import { useAppContext } from '@/contexts/AppContext'
import { Button } from '@/components/Core/Button'
import { useRouter } from 'next/router'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import {
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from '@/styles/shared'

interface Props {
  hasOverlay?: boolean
}

export function SignUpModal({ hasOverlay = true }: Props) {
  const router = useRouter()

  const isRouteLoading = useLoadingOnRouteChange()

  const { handleSetIsSignUpModalOpen } = useAppContext()

  return (
    <Dialog.Portal>
      <ModalOverlay
        className="DialogOverlay"
        hasOverlay={hasOverlay}
        onClick={() => handleSetIsSignUpModalOpen(false)}
      />

      <ModalContent className="DialogContent">
        <ModalHeader>
          <ModalTitle className="DialogTitle">
            Ooops... You&apos;re not logged in!
          </ModalTitle>
          <ModalCloseButton onClick={() => handleSetIsSignUpModalOpen(false)}>
            <X alt="Close" />
          </ModalCloseButton>
        </ModalHeader>

        <ModalDescription className="DialogDescription">
          <p>Sign in to bookmark and revisit your favorite media anytime!</p>
        </ModalDescription>

        <Button
          type="button"
          content="Sign In"
          onClick={() => {
            handleSetIsSignUpModalOpen(false)
            router.push('/')
          }}
          isSubmitting={isRouteLoading}
          style={{
            marginTop: '1rem',
          }}
        />
      </ModalContent>
    </Dialog.Portal>
  )
}
