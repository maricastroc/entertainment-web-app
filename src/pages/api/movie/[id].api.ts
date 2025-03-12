/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  getMovieCasts,
  getMovieDetail,
  getMovieReviews,
  getMovieSimilars,
  getMovieVideos,
} from '../../../lib/tmdb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  try {
    const response = await fetch(getMovieDetail(id as string))
    const response2 = await fetch(getMovieCasts(id as string))
    const response3 = await fetch(getMovieReviews(id as string))
    const response4 = await fetch(getMovieSimilars(id as string))
    const response5 = await fetch(getMovieVideos(id as string))

    const data = await response.json()
    const data2 = await response2.json()
    const data3 = await response3.json()
    const data4 = await response4.json()
    const data5 = await response5.json()

    res.status(200).json({
      detail: data,
      credits: data2,
      reviews: data3,
      similars: data4,
      videos: data5,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
