import { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'
import clientPromise from '../../../lib/mongodb'
import { pinMetadata } from '../../../lib/pinata'
import { MongoDoc, NftMetadata } from '../../../lib/types'
import { formatZeitgeistDate } from '../../../lib/dateFormat'
import { authOptions } from '../auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import Zeitgeist from '../../../public/artifacts/Zeitgeist.json'

type MintNftResponse = {
  success: boolean
  message?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<MintNftResponse>) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (process.env.DISABLE_AUTH || session) {
    try {
      const { date, trend, headline, prompt, ipfsImageHash, ipfsImageTimestamp } = req.query
      const mongoClient = await clientPromise
      const db = await mongoClient.db()

      const suffixedDate = formatZeitgeistDate(date as string)

      const metadata = {
        description:
          'The Zeitgeist - Inspired by culture. Imagined by AI. One piece generated every day.',
        image: `ipfs://${ipfsImageHash}`,
        name: `${trend} - ${suffixedDate}`,
        attributes: [
          {
            trait_type: 'Date',
            value: suffixedDate,
          },
          {
            trait_type: 'Trend',
            value: trend,
          },
          {
            trait_type: 'Headline',
            value: headline,
          },
          {
            trait_type: 'Prompt',
            value: prompt,
          },
        ],
      } as NftMetadata

      const pinMetadataResponse = await pinMetadata(metadata, `${trend}-${date}`)

      // mint NFT
      const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL_RINKEBY)
      const wallet = new ethers.Wallet(String(process.env.PRIVATE_KEY), provider)
      // @ts-ignore
      const signer = wallet.provider.getSigner(wallet.address)
      const contract = new ethers.Contract(
        String(process.env.NEXT_PUBLIC_ZEITGEIST_CONTRACT_ADDRESS),
        Zeitgeist.abi,
        signer,
      )

      const tokenId = await contract.callStatic.mintNFT(`ipfs://${pinMetadataResponse.IpfsHash}`)

      const unsignedTx = await contract.populateTransaction.mintNFT(
        `ipfs://${pinMetadataResponse.IpfsHash}`,
      )

      const txn = await wallet.sendTransaction(unsignedTx)
      await txn.wait()

      console.log(unsignedTx)
      console.log(txn)
      console.log(Number(tokenId))

      const mongoDoc = {
        tokenId: tokenId,
        ipfsGateway: process.env.IPFS_GATEWAY,
        ipfsImageHash: ipfsImageHash,
        ipfsImageTimestamp: ipfsImageTimestamp,
        ipfsMetadataHash: pinMetadataResponse.IpfsHash,
        ipfsMetadataTimestamp: pinMetadataResponse.Timestamp,
        image: `https://${process.env.IPFS_GATEWAY}/ipfs/${ipfsImageHash}`,
        date: date,
        trend: trend,
        headline: headline,
        prompt: prompt,
      } as MongoDoc

      const response = await db.collection('items').insertOne(mongoDoc)

      res.json({
        success: response.acknowledged,
      })
    } catch (e) {
      console.error(e)
      res.json({
        success: false,
      })
    }
  } else {
    res.json({
      success: false,
      message: 'Not Authenticated',
    })
  }
}

export default handler
