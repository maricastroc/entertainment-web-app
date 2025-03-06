import { CastCardProps } from '../..'
import {
  CastCard,
  CastContainer,
  CastHeader,
  CastInfo,
  CastWrapper,
} from './styles'

interface Props {
  castData: CastCardProps[] | []
  handleOpenModal: () => void
}

export function CastSection({ castData, handleOpenModal }: Props) {
  return (
    <CastWrapper>
      <CastHeader>
        <h2>Main Cast</h2>
        <button onClick={handleOpenModal}>view all</button>
      </CastHeader>
      <CastContainer>
        {castData?.slice(0, 6).map((item, index) => {
          return (
            <CastCard key={index}>
              <div>
                <img
                  src={
                    item?.profile_path
                      ? `https://image.tmdb.org/t/p/original/${item.profile_path}`
                      : 'https://github.com/octocat.png'
                  }
                  alt={item?.name || 'Imagem de perfil'}
                />
              </div>
              <CastInfo>
                <p>{item.name}</p>
                <span>{item.character}</span>
              </CastInfo>
            </CastCard>
          )
        })}
      </CastContainer>
    </CastWrapper>
  )
}
