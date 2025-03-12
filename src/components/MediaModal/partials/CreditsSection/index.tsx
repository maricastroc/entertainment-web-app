import { CastProps } from '@/types/cast'
import {
  CaretLeftIcon,
  CaretRightIcon,
  CastCard,
  CastContainer,
  CastHeader,
  CastInfo,
  CastWrapper,
} from './styles'
import { useRef } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { CrewProps } from '@/types/crew'

interface Props {
  creditsType: 'cast' | 'crew'
  castData: CastProps[] | []
  crewData: CrewProps[] | []
  handleOpenModal: () => void
}

export function CreditsSection({
  castData,
  creditsType,
  crewData,
  handleOpenModal,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  function handleScrollRight() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  function handleScrollLeft() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  return (
    <CastWrapper>
      <CastHeader>
        <h2>{`${creditsType === 'cast' ? `Main Cast` : `Main Crew`}`}</h2>
        <button onClick={handleOpenModal}>view all</button>
      </CastHeader>
      <CastContainer ref={scrollContainerRef}>
        <CaretLeftIcon onClick={handleScrollLeft}>
          <CaretLeft />
        </CaretLeftIcon>
        {creditsType === 'crew'
          ? crewData?.map((item, index) => {
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
                    <span>{item.known_for_department}</span>
                  </CastInfo>
                </CastCard>
              )
            })
          : castData?.map((item, index) => {
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
        <CaretRightIcon onClick={handleScrollRight}>
          <CaretRight />
        </CaretRightIcon>
      </CastContainer>
    </CastWrapper>
  )
}
