import type { NextApiRequest, NextApiResponse } from 'next'
import { getTrend, getHeadline, generatePrompt } from '../../../lib/generate'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const datObj = new Date()
  const date = req.query.date
    ? String(req.query.date)
    : `${datObj.getFullYear()}-${datObj.getMonth() + 1}-${datObj.getDate()}`

  const trend = await getTrend(date)
  const headline = await getHeadline(date, trend)
  const prompt = await generatePrompt(headline)

  res.json({
    trend,
    headline,
    prompt,
  })
}
