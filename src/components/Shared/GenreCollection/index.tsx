import { NextSeo } from 'next-seo'
import { MainContent, MovieGenresContainer, TvGenresContainer } from './styles'
import { pathToSearchMovie, pathToSearchTV } from '@/utils'
import { GenreCard } from '@/components/Shared/GenreCard'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { MOVIE_MEDIA, TV_MEDIA } from '@/utils/constants'
import AuthLayout from '@/layouts/auth'

interface GenreItem {
  name: string
  id: string
}

interface GenreCollectionProps {
  data: {
    genres: GenreItem[]
  }
  media: string
}

export default function GenreCollection({ data, media }: GenreCollectionProps) {
  const isRouteLoading = useLoadingOnRouteChange()

  return (
    <>
      <NextSeo
        title={
          media === TV_MEDIA
            ? 'Genre Series | MovieMentor'
            : 'Genre Movies | MovieMentor'
        }
        additionalMetaTags={[
          {
            name: 'viewport',
            content:
              'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
          },
        ]}
      />
      <AuthLayout
        isLoading={isRouteLoading}
        searchPath={media === TV_MEDIA ? pathToSearchTV : pathToSearchMovie}
        searchPlaceholder={
          media === TV_MEDIA ? 'Search for Series' : 'Search for Movies'
        }
      >
        <MainContent>
          {media === TV_MEDIA ? (
            <TvGenresContainer>
              {data?.genres?.map((item, index) => {
                return (
                  <GenreCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    media_type={media}
                    background={index % 2 === 0 ? 'isEvenTv' : 'notEven'}
                  />
                )
              })}
            </TvGenresContainer>
          ) : (
            <MovieGenresContainer>
              {data?.genres?.map((item, index) => {
                return (
                  <GenreCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    media_type={media}
                    background={
                      index % 2 === 0
                        ? `${
                            media === MOVIE_MEDIA ? 'isEvenMovie' : 'isEvenTv'
                          }`
                        : 'notEven'
                    }
                  />
                )
              })}
            </MovieGenresContainer>
          )}
        </MainContent>
      </AuthLayout>
    </>
  )
}
