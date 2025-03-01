import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  BackgroundImage,
  CardInfo,
  CardInfoData,
  CardInfoTitle,
  Container,
  NotFoundImage,
} from './styles'
import { faFilm, faTv } from '@fortawesome/free-solid-svg-icons'
import { getFullYear } from '@/utils/getFullYear'
import { useEffect, useState } from 'react'
import { MediaDataProps } from '../MediaModal'

export function BookmarkCard({
  id,
  media,
  handleClick,
}: {
  id: string
  media: string
  handleClick: () => void
}) {
  const [mediaData, setMediaData] = useState<MediaDataProps | undefined>()

  useEffect(() => {
    if (!id) return

    fetch(`/api/${media}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMediaData(data)
      })
      .catch((error) => {
        console.error('Error getting details:', error)
      })
  }, [id, media])

  return (
    <Container onClick={handleClick}>
      {mediaData && (
        <>
          {mediaData?.detail?.backdrop_path ? (
            <BackgroundImage
              src={`https://image.tmdb.org/t/p/original${mediaData?.detail?.backdrop_path}`}
              alt=""
            />
          ) : (
            <NotFoundImage
              alt=""
              src="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMzMzIiBvZmZzZXQ9IjIwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzIyMiIgb2Zmc2V0PSI1MCUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iNzAlIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMzMzMiIC8+CiAgPHJlY3QgaWQ9InIiIHdpZHRoPSIyNDAiIGhlaWdodD0iMTQwIiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItMjQwIiB0bz0iMjQwIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIC8+Cjwvc3ZnPgo="
            />
          )}
          <CardInfo>
            <CardInfoData>
              {mediaData?.detail?.first_air_date && (
                <p>{getFullYear(mediaData?.detail?.first_air_date)}</p>
              )}
              {mediaData?.detail?.release_date && (
                <p>{getFullYear(mediaData?.detail?.release_date)}</p>
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
              {mediaData?.detail?.name || mediaData?.detail?.original_title}
            </CardInfoTitle>
          </CardInfo>
        </>
      )}
    </Container>
  )
}
