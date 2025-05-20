import { useRouter } from 'next/router'
import { AvatarContainer } from './styles'
import { Tooltip } from 'react-tooltip'
import { useSession } from 'next-auth/react'
import AvatarDefaultImage from '../../.././../../public/assets/avatar_mockup.png'
import { useAppContext } from '@/contexts/AppContext'

export const AvatarButton = () => {
  const router = useRouter()

  const session = useSession()

  const { user, handleSetIsSignUpModalOpen } = useAppContext()

  return (
    <>
      <AvatarContainer
        data-tooltip-id={'Profile'}
        data-tooltip-content={'Profile Page'}
        onClick={() => {
          if (!session?.data?.user) {
            handleSetIsSignUpModalOpen(true)
            return
          }

          router.push('/profile')
        }}
      >
        <img
          src={
            user?.avatarUrl ||
            session?.data?.user?.avatarUrl ||
            AvatarDefaultImage.src
          }
          alt=""
        />
      </AvatarContainer>

      <Tooltip
        id={'Profile'}
        place="right"
        style={{ backgroundColor: '#26334F', border: 'solid 1px #D1D6E4' }}
      />
    </>
  )
}
