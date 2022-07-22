export type NftMetadata = {
  description: string
  image: string
  name: string
  attributes: Array<{
    trait_type: string
    value: string
  }>
}

export type MongoDoc = {
  tokenId: number
  ipfsGateway: string
  ipfsImageHash: string
  ipfsImageTimestamp: string
  ipfsMetadataHash: string
  ipfsMetadataTimestamp: string
  image: string
  date: string
  trend: string
  headline: string
  prompt: string
}
