/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'
import { getTvCasts, getTvDetail } from '../../../lib/tmdb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  try {
    const response = await fetch(getTvDetail(id as string))
    const response2 = await fetch(getTvCasts(id as string))
    const data = await response.json()
    const data2 = await response2.json()
    res.status(200).json({
      detail: data,
      credits: data2,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
