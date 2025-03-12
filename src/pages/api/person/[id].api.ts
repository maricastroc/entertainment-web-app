/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'
import { getPersonDetail } from '../../../lib/tmdb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  try {
    const response = await fetch(getPersonDetail(id as string))

    const data = await response.json()

    res.status(200).json({
      detail: data,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
