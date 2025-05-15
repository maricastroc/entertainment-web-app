/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'
import { getPersonDetail, getPersonSocialMedia } from '../../../lib/tmdb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  try {
    const [detailRes, socialRes] = await Promise.all([
      fetch(getPersonDetail(id as string)),
      fetch(getPersonSocialMedia(id as string)),
    ])

    const [detailData, socialData] = await Promise.all([
      detailRes.json(),
      socialRes.json(),
    ])

    res.status(200).json({
      detail: detailData,
      social: socialData,
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
