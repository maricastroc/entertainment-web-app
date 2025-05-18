/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  BackgroundImage,
  CardInfo,
  CardInfoData,
  CardInfoTitle,
  Container,
  MediaImageWrapper,
  Wrapper,
} from './styles'
import IconMovie from '../../../../public/assets/icon-category-movie.svg'
import IconTv from '../../../../public/assets/icon-category-tv.svg'
import { getFullYear } from '@/utils/getFullYear'
import { MediaCardProps } from '@/pages/home/index.page'
import Loading from '@/components/Core/Loading'
import Image from 'next/image'
import { SaveButton } from '../SaveButton'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import useRequest from '@/utils/useRequest'
import { UserProps } from '@/types/user'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import { handleApiError } from '@/utils/handleApiError'
import { useSession } from 'next-auth/react'
import { MOVIE_MEDIA, TV_MEDIA } from '@/utils/constants'

export function TrendingMediaCard({
  id,
  backdrop_path,
  poster_path,
  first_air_date,
  release_date,
  media_type,
  name,
  title,
  handleClick,
}: MediaCardProps) {
  const [isInUserList, setIsInUserList] = useState(false)

  const { handleSetIsLoading, handleSetIsSignUpModalOpen } = useAppContext()

  const { status } = useSession()

  const { data, mutate, isValidating } = useRequest<UserProps | null>({
    url: '/profile',
    method: 'GET',
  })

  async function handleMediaAction(action: 'save' | 'delete') {
    try {
      handleSetIsLoading(true)

      const mediaRoute = media_type === MOVIE_MEDIA ? 'movies' : 'series'
      const endpoint = `/user/${mediaRoute}`
      const options =
        action === 'save'
          ? { method: 'post', data: { mediaId: String(id) } }
          : { method: 'delete', data: { mediaId: String(id) } }

      const response = await api(endpoint, {
        ...options,
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.data) {
        toast.success(response.data.message)
        setIsInUserList(action === 'save')
        mutate && mutate()
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      handleSetIsLoading(false)
    }
  }

  useEffect(() => {
    if (data?.savedMovies && media_type === MOVIE_MEDIA) {
      const savedMovies = data?.savedMovies?.map((movie) => movie.id)

      setIsInUserList(savedMovies.includes(String(id)))
    } else if (data?.savedSeries && media_type === TV_MEDIA) {
      const savedSeries = data?.savedSeries?.map((movie) => movie.id)

      setIsInUserList(savedSeries.includes(String(id)))
    }
  }, [media_type, id, data?.savedMovies, data?.savedSeries])

  useEffect(() => {
    handleSetIsLoading(!!isValidating)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidating])

  return (
    <Wrapper>
      {name || title ? (
        <Container>
          <MediaImageWrapper>
            <BackgroundImage
              onClick={handleClick}
              src={
                `https://image.tmdb.org/t/p/w500${backdrop_path}` ||
                `https://image.tmdb.org/t/p/w500${poster_path}`
              }
              alt=""
            />
            <SaveButton
              isInUserList={isInUserList}
              onClick={() => {
                if (status === 'authenticated') {
                  if (isInUserList) {
                    handleMediaAction('delete')
                  } else {
                    handleMediaAction('save')
                  }
                } else {
                  handleSetIsSignUpModalOpen(true)
                }
              }}
            />
          </MediaImageWrapper>
          <CardInfo>
            <CardInfoData>
              {first_air_date ? (
                <p>{getFullYear(first_air_date)}</p>
              ) : (
                <p>{getFullYear(release_date!)}</p>
              )}
              <span>•</span>
              {media_type === MOVIE_MEDIA ? (
                <p>
                  <Image alt="" src={IconMovie} />
                  Movie
                </p>
              ) : (
                <p>
                  <Image alt="" src={IconTv} />
                  Series
                </p>
              )}
            </CardInfoData>
            <CardInfoTitle>{name || title}</CardInfoTitle>
          </CardInfo>
        </Container>
      ) : (
        <Loading />
      )}
    </Wrapper>
  )
}
