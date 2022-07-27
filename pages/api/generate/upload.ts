import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { Stream } from 'stream'
import { nanoid } from 'nanoid'
import { pinToPinata } from '../../../lib/pinata'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

type UploadResponse = {
  success: boolean
  message?: string
  imageUrl: string
  pinataTimestamp: string
  pinataHash: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<UploadResponse>) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (process.env.DISABLE_AUTH || session) {
    const finishedDownloading = promisify(Stream.finished)
    const imageUrl = String(req.query.imageUrl)
    const imageTrend = String(req.query.trend)
    const imageDate = String(req.query.date)
    const imageName = imageTrend + '-' + imageDate + '-' + nanoid(5)
    const imagePath = path.join('/tmp', `${imageName}.png`)
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
      success: true,
      imageUrl: `https://${process.env.IPFS_GATEWAY ?? 'metawallet.mypinata.cloud'}/ipfs/${
        pinRes.IpfsHash
      }`,
      pinataTimestamp: pinRes.Timestamp,
      pinataHash: pinRes.IpfsHash,
    })
  } else {
    res.json({
      success: false,
      message: 'Not Authenticated',
      imageUrl: '',
      pinataTimestamp: '',
      pinataHash: '',
    })
  }
}

export default handler
