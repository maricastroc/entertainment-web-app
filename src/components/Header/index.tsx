import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AvatarContainer,
  AvatarImage,
  ButtonPagesContainer,
  Container,
} from './styles'
import {
  faClapperboard,
  faFilm,
  faTableCellsLarge,
  faTv,
} from '@fortawesome/free-solid-svg-icons'

export function Header() {
  return (
    <Container>
      <FontAwesomeIcon icon={faClapperboard} />
      <ButtonPagesContainer>
        <FontAwesomeIcon icon={faTableCellsLarge} />
        <FontAwesomeIcon icon={faFilm} />
        <FontAwesomeIcon icon={faTv} />
      </ButtonPagesContainer>
      <AvatarContainer>
        <AvatarImage src="https://github.com/maricastroc.png" alt="" />
      </AvatarContainer>
    </Container>
  )
}
