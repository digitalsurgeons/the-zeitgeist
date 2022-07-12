import type { NextApiRequest, NextApiResponse } from 'next'
import { Dalle } from 'dalle-node'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query
  const dalle = new Dalle(process.env.DALLE_API_BEARER)
  const result = await dalle.generate(query)
  res.status(200).json({
    result,
  })
}
