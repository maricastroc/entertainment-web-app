import { NextApiResponse } from 'next'

export class ApiError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export function handleServiceError(error: unknown, res: NextApiResponse) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message })
  }
  if (error instanceof Error && 'statusCode' in error) {
    return res
      .status((error as ApiError).statusCode)
      .json({ message: error.message })
  }
  console.error(error)
  return res.status(500).json({ message: 'Internal server error' })
}
