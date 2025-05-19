/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  BackgroundImage,
  CardInfo,
  CardInfoData,
  CardInfoTitle,
  Container,
  MediaImageWrapper,
} from './styles'
import { faFilm, faTv } from '@fortawesome/free-solid-svg-icons'
import { getFullYear } from '@/utils/getFullYear'
import { useState } from 'react'
import { MediaDetailsProps } from '@/types/media-details'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import { useAppContext } from '@/contexts/AppContext'
import { handleApiError } from '@/utils/handleApiError'
import { MOVIE_MEDIA } from '@/utils/constants'
import { SaveButton } from '@/components/Shared/SaveButton'
import { NotFound } from '@/components/Shared/MediaCard/styles'

export function BookmarkCard({
  mediaDetails,
  mediaType,
  mutate,
  handleClick,
}: {
  mediaDetails: MediaDetailsProps
  mediaType: string
  mutate: any
  handleClick: () => void
}) {
  const [isInUserList, setIsInUserList] = useState(true)

  const { handleSetIsLoading } = useAppContext()

  async function handleDeleteMedia() {
    try {
      handleSetIsLoading(true)

      const mediaRoute = mediaType === MOVIE_MEDIA ? 'movies' : 'series'

      const response = await api.delete(`/user/${mediaRoute}`, {
        data: { mediaId: String(mediaDetails.id) },
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

  return (
    <Container>
      <MediaImageWrapper>
        {mediaDetails?.backdrop_path ? (
          <BackgroundImage
            onClick={handleClick}
            src={`https://image.tmdb.org/t/p/original${mediaDetails?.backdrop_path}`}
            alt=""
          />
        ) : (
          <NotFound>Not found</NotFound>
        )}

        <SaveButton
          isInUserList={isInUserList}
          onClick={() => handleDeleteMedia()}
        />
      </MediaImageWrapper>
      <CardInfo>
        <CardInfoData>
          {mediaDetails?.first_air_date && (
            <p>{getFullYear(mediaDetails?.first_air_date)}</p>
          )}
          {mediaDetails?.release_date && (
            <p>{getFullYear(mediaDetails?.release_date)}</p>
          )}
          <span>•</span>
          {mediaType === MOVIE_MEDIA ? (
            <p>
              <FontAwesomeIcon icon={faFilm} />
              Movie
            </p>
          ) : (
            <p>
              <FontAwesomeIcon icon={faTv} />
              Series
            </p>
          )}
        </CardInfoData>
        <CardInfoTitle>
          {mediaDetails?.name || mediaDetails?.original_title}
        </CardInfoTitle>
      </CardInfo>
    </Container>
  )
}
