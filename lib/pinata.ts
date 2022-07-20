import pinataClient, { type PinataPinResponse } from '@pinata/sdk'

const client = pinataClient(process.env.PINATA_API_KEY!, process.env.PINATA_API_SECRET!)

export const pinToPinata = async (
  pinataName: string,
  filePath: string,
): Promise<PinataPinResponse> => {
  return await client.pinFromFS(filePath, {
    pinataMetadata: {
      name: `Zeitgeist-${pinataName}`,
    },
  })
}
