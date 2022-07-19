import type { NextApiRequest, NextApiResponse } from 'next'
import { getTrend, getHeadline, generatePrompt } from '../../../lib/generate'
import dayjs from 'dayjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const date = req.query.date
    ? String(req.query.date)
    : `${dayjs().subtract(1, 'days').format('YYYY-MM-DD')}`

  const trend = await getTrend(date)
  const headline = await getHeadline(date, trend)
  const prompt = await generatePrompt(headline)

  res.json({
    trend,
    headline,
    prompt,
  })
}

export default handler
