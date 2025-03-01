import axios from 'axios'
import toast from 'react-hot-toast'

export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error) && error.response) {
    let errorMessage = 'Ooops, something went wrong. Please try again later.'

    if (typeof error.response.data.message === 'string') {
      errorMessage = error.response.data.message
    } else if (
      error.response.data.message &&
      typeof error.response.data.message === 'object'
    ) {
      errorMessage = Object.values(error.response.data.message).join(', ')
    }

    toast.error(errorMessage)
  } else {
    toast.error('Ooops, something went wrong. Please try again later.')
  }
}
