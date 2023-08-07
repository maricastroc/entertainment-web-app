/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'
import { getUrl2, trendingMovieDay } from '../../../../lib/tmdb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  try {
    const url = getUrl2(trendingMovieDay, id as string)
    const response = await fetch(url)
    const data = await response.json()
    res.status(200).json({
      results: data.results,
      total_pages: data.total_pages,
      total_results: data.total_results,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
