import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'

import {
  Title,
  Content,
  CloseButton,
  Header,
  Overlay,
  Description,
} from './styles'
import { useAppContext } from '@/contexts/AppContext'
import { Button } from '@/components/Core/Button'
import { useRouter } from 'next/router'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'

export function SignUpModal() {
  const router = useRouter()

  const isRouteLoading = useLoadingOnRouteChange()

  const { handleSetIsSignUpModalOpen } = useAppContext()

  return (
    <Dialog.Portal>
      <Overlay
        className="DialogOverlay"
        onClick={() => handleSetIsSignUpModalOpen(false)}
      />

      <Content className="DialogContent">
        <Header>
          <Title className="DialogTitle">
            Ooops... You&apos;re not logged in!
          </Title>
          <CloseButton onClick={() => handleSetIsSignUpModalOpen(false)}>
            <X alt="Close" />
          </CloseButton>
        </Header>

        <Description className="DialogDescription">
          <p>Sign in to bookmark and revisit your favorite media anytime!</p>
        </Description>

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
      </Content>
    </Dialog.Portal>
  )
}
