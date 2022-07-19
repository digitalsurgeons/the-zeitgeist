import type { NextApiRequest, NextApiResponse } from 'next'
import { uploadImage } from '../../../lib/generate'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { Stream } from 'stream'
import { nanoid } from 'nanoid'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const finishedDownloading = promisify(Stream.finished)
  const imageUrl = String(req.query.imageUrl)
  const imageTrend = String(req.query.trend)
  const imageName = imageTrend + '-' + nanoid()
  const imagePath = path.join(process.cwd(), 'public', 'tmp', `${imageName}.png`)
  const writer = fs.createWriteStream(imagePath)

  const response = await axios({
    url: imageUrl,
    method: 'GET',
    responseType: 'stream',
  })

  response.data.pipe(writer)
  await finishedDownloading(writer)

  res.json({
    image: `/tmp/${imageName}.png`,
  })
}

export default handler
