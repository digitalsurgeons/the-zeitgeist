import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { Stream } from 'stream'
import { nanoid } from 'nanoid'
import { pinToPinata } from '../../../lib/pinata'

type UploadResponse = {
  imageUrl: string
  pinataTimestamp: string
  pinataHash: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<UploadResponse>) => {
  const finishedDownloading = promisify(Stream.finished)
  const imageUrl = String(req.query.imageUrl)
  const imageTrend = String(req.query.trend)
  const imageDate = String(req.query.date)
  const imageName = imageTrend + '-' + imageDate + '-' + nanoid(5)
  const imagePath = path.join(process.cwd(), 'public', 'tmp', `${imageName}.png`)
  const writer = fs.createWriteStream(imagePath)

  const response = await axios({
    url: imageUrl,
    method: 'GET',
    responseType: 'stream',
  })

  response.data.pipe(writer)
  await finishedDownloading(writer)

  const pinRes = await pinToPinata(imageName, imagePath)

  res.json({
    imageUrl: `/tmp/${imageName}.png`,
    pinataTimestamp: pinRes.Timestamp,
    pinataHash: pinRes.IpfsHash,
  })
}

export default handler
