import pinataClient from '@pinata/sdk'
import { NftMetadata } from './types'

const client = pinataClient(process.env.PINATA_API_KEY!, process.env.PINATA_API_SECRET!)

export const pinToPinata = async (pinataName: string, filePath: string) => {
  return await client.pinFromFS(filePath, {
    pinataMetadata: {
      name: `Zeitgeist-${pinataName}`,
    },
  })
}

export const pinMetadata = async (metadata: NftMetadata, pinataName: string) => {
  return await client.pinJSONToIPFS(metadata, {
    pinataMetadata: {
      name: `Zeitgeist-${pinataName}.json`,
    },
  })
}
