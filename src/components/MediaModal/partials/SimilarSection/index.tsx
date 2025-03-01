import { SimilarCard, SimilarCardProps } from '@/components/SimilarCard'
import { SimilarContainer, SimilarContent } from './styles'

interface Props {
  media: string
  similarMedias: SimilarCardProps[] | [] | undefined
  handleClick: (id: string) => void
}

export function SimilarSection({ similarMedias, media, handleClick }: Props) {
  return (
    <SimilarContainer>
      <h2>You may also like</h2>
      <SimilarContent>
        {similarMedias &&
          similarMedias.map((item) => {
            return (
              <SimilarCard
                handleClick={() => handleClick(item.id)}
                id={item.id}
                key={item.id}
                release_date={item?.release_date || item?.first_air_date}
                title={item?.title || item?.name}
                backdrop_path={item?.backdrop_path}
                media_type={media}
              />
            )
          })}
      </SimilarContent>
    </SimilarContainer>
  )
}
