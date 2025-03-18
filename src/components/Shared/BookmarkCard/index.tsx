/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  BackgroundImage,
  CardInfo,
  CardInfoData,
  CardInfoTitle,
  Container,
  MediaImageWrapper,
  NotFoundImage,
} from './styles'
import { faFilm, faTv } from '@fortawesome/free-solid-svg-icons'
import { getFullYear } from '@/utils/getFullYear'
import { useEffect, useState } from 'react'
import { MediaDetailsProps } from '@/types/media-details'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import { useAppContext } from '@/contexts/AppContext'
import { handleApiError } from '@/utils/handleApiError'
import { SaveButton } from '../SaveButton'

export function BookmarkCard({
  id,
  media,
  mutate,
  handleClick,
}: {
  id: string
  media: string
  mutate: any
  handleClick: () => void
}) {
  const [mediaData, setMediaData] = useState<MediaDetailsProps | undefined>()

  const [isInUserList, setIsInUserList] = useState(true)

  const { handleSetIsLoading } = useAppContext()

  async function handleDeleteMedia() {
    try {
      handleSetIsLoading(true)

      const mediaRoute = media === 'movie' ? 'movies' : 'series'

      const response = await api.delete(`/user/${mediaRoute}`, {
        data: { mediaId: String(id) },
      })

      if (response.data) {
        toast.success(response.data.message)

        setIsInUserList(false)

        mutate && mutate()
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      handleSetIsLoading(false)
    }
  }

  useEffect(() => {
    if (!id) return

    fetch(`/api/${media}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMediaData(data.detail)
      })
      .catch((error) => {
        console.error('Error getting details:', error)
      })
  }, [id, media])

  return (
    <Container>
      {mediaData && (
        <>
          <MediaImageWrapper>
            {mediaData?.backdrop_path ? (
              <BackgroundImage
                onClick={handleClick}
                src={`https://image.tmdb.org/t/p/original${mediaData?.backdrop_path}`}
                alt=""
              />
            ) : (
              <NotFoundImage
                onClick={handleClick}
                alt=""
                src="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMzMzIiBvZmZzZXQ9IjIwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzIyMiIgb2Zmc2V0PSI1MCUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iNzAlIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMzMzMiIC8+CiAgPHJlY3QgaWQ9InIiIHdpZHRoPSIyNDAiIGhlaWdodD0iMTQwIiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItMjQwIiB0bz0iMjQwIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIC8+Cjwvc3ZnPgo="
              />
            )}

            <SaveButton
              isInUserList={isInUserList}
              onClick={() => handleDeleteMedia()}
            />
          </MediaImageWrapper>
          <CardInfo>
            <CardInfoData>
              {mediaData?.first_air_date && (
                <p>{getFullYear(mediaData?.first_air_date)}</p>
              )}
              {mediaData?.release_date && (
                <p>{getFullYear(mediaData?.release_date)}</p>
              )}
              <span>•</span>
              {media === 'movie' ? (
                <p>
                  <FontAwesomeIcon icon={faFilm} />
                  Movie
                </p>
              ) : (
                <p>
                  <FontAwesomeIcon icon={faTv} />
                  TV Series
                </p>
              )}
            </CardInfoData>
            <CardInfoTitle>
              {mediaData?.name || mediaData?.original_title}
            </CardInfoTitle>
          </CardInfo>
        </>
      )}
    </Container>
  )
}
