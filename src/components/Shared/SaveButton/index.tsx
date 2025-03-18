import BookmarkEmpty from '../../../../public/assets/icon-bookmark-empty.svg'
import BookmarkFull from '../../../../public/assets/icon-bookmark-full.svg'
import Image from 'next/image'
import { ButtonHTMLAttributes } from 'react'
import { Container } from './styles'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isInUserList: boolean
}

export const SaveButton = ({ isInUserList, ...props }: Props) => {
  return (
    <Container {...props}>
      {isInUserList ? (
        <Image width={13} height={14} alt="" src={BookmarkFull} />
      ) : (
        <Image width={13} height={14} alt="" src={BookmarkEmpty} />
      )}
    </Container>
  )
}
