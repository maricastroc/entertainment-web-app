import {
  BackgroundImage,
  CardInfo,
  CardInfoData,
  CardInfoTitle,
  Container,
  MediaImageWrapper,
  NotFound,
} from './styles'
import { getFullYear } from '@/utils/getFullYear'
import { MediaCardProps } from '@/pages/home/index.page'
import IconMovie from '../../../../public/assets/icon-category-movie.svg'
import IconTv from '../../../../public/assets/icon-category-tv.svg'
import Image from 'next/image'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import { handleApiError } from '@/utils/handleApiError'
import useRequest from '@/utils/useRequest'
import { UserProps } from '@/types/user'
import { useAppContext } from '@/contexts/AppContext'
import { SaveButton } from '../SaveButton'
import { useSession } from 'next-auth/react'
import { MOVIE_MEDIA, PERSON_MEDIA, TV_MEDIA } from '@/utils/constants'

export function MediaCard({
  id,
  backdrop_path,
  first_air_date,
  media_type,
  name,
  handleClick,
}: MediaCardProps) {
  const [isInUserList, setIsInUserList] = useState(false)

  const { status } = useSession()

  const { handleSetIsLoading, handleSetIsSignUpModalOpen } = useAppContext()

  const { data, mutate, isValidating } = useRequest<UserProps | null>({
    url: '/profile',
    method: 'GET',
  })

  async function handleMediaAction(action: 'save' | 'delete') {
    try {
      if (media_type === PERSON_MEDIA) {
        return
      }

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
    <Container>
      <MediaImageWrapper>
        {backdrop_path ? (
          <BackgroundImage
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt=""
            onClick={handleClick}
          />
        ) : (
          <NotFound onClick={handleClick}>
            <p>Not found</p>
          </NotFound>
        )}

        {media_type !== PERSON_MEDIA && (
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
        )}
      </MediaImageWrapper>
      <CardInfo>
        <CardInfoData>
          {media_type !== PERSON_MEDIA &&
            (first_air_date ? (
              <p>{getFullYear(first_air_date)}</p>
            ) : (
              <p>N/A</p>
            ))}
          {media_type !== PERSON_MEDIA && <span>•</span>}
          {(() => {
            switch (media_type) {
              case MOVIE_MEDIA:
                return (
                  <p>
                    <Image alt="" src={IconMovie} />
                    Movie
                  </p>
                )
              case TV_MEDIA:
                return (
                  <p>
                    <Image alt="" src={IconTv} />
                    Series
                  </p>
                )
              case PERSON_MEDIA:
                return (
                  <p>
                    <FontAwesomeIcon icon={faPerson} />
                    Person
                  </p>
                )
              default:
                return <p>N/A</p>
            }
          })()}
        </CardInfoData>
        <CardInfoTitle>{name}</CardInfoTitle>
      </CardInfo>
    </Container>
  )
}
