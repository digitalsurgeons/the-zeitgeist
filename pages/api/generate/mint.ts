import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

type MintResponse = {
  success: boolean
  message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<MintResponse>) => {
  try {
    const { date, trend, prompt, image } = req.query
    const mongoClient = await clientPromise
    const db = await mongoClient.db()
    const tokenId = (await db.collection('items').countDocuments()) + 1
    const response = await db.collection('items').insertOne({
      trend,
      prompt,
      image,
      date,
      tokenId,
    })

    if (!response.acknowledged) {
      res.json({
        success: false,
        message: "Don't think it inserted",
      })
    }

    res.json({
      success: true,
      message: `Token id = ${tokenId}, Object id = ${response.insertedId}`,
    })
  } catch (e) {
    console.error(e)
    res.json({
      success: false,
      message: 'There was an error',
    })
  }
}

export default handler
