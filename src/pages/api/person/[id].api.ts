/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  getPersonDetail,
  getPersonMovieCredits,
  getPersonSocialMedia,
  getPersonTvCredits,
} from '../../../lib/tmdb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { id } = req.query

  try {
    const [detailRes, socialRes, movieRes, tvRes] = await Promise.all([
      fetch(getPersonDetail(id as string)),
      fetch(getPersonSocialMedia(id as string)),
      fetch(getPersonMovieCredits(id as string)),
      fetch(getPersonTvCredits(id as string)),
    ])

    const [detailData, socialData, movieData, tvData] = await Promise.all([
      detailRes.json(),
      socialRes.json(),
      movieRes.json(),
      tvRes.json(),
    ])

    res.status(200).json({
      detail: detailData,
      social: socialData,
      movieCredits: movieData,
      tvCredits: tvData,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
