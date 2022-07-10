import type { NextApiRequest, NextApiResponse } from 'next'
import { generateKeywords, generatePrompt } from '../../lib/generatePrompt'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const keywords = await generateKeywords()
  const prompt = await generatePrompt(keywords)
  res.status(200).json({
    keywords,
    prompt,
  })
}
