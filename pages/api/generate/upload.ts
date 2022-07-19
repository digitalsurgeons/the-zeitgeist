import type { NextApiRequest, NextApiResponse } from 'next'
import { uploadImage } from '../../../lib/generate'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const imageUrl = String(req.query.imageUrl)

  const image = await uploadImage(imageUrl)

  res.json({
    image,
  })
}

export default handler
