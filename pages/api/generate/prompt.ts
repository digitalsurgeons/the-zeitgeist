import type { NextApiRequest, NextApiResponse } from 'next'
import { getTrend, getHeadline, generatePrompt } from '../../../lib/generate'
import dayjs from 'dayjs'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (process.env.DISABLE_AUTH || session) {
    console.log(session)
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
  } else {
    res.json({
      success: false,
      message: 'Not Authenticated',
    })
  }
}

export default handler
