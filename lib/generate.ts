require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')
const emojiStrip = require('emoji-strip')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const generateKeywords = async () => {
  const twitterTrendsReq = await fetch(
    'https://api.twitter.com/1.1/trends/place.json?id=2458410',
    {
      headers: new Headers({
        Authorization: `Bearer ${process.env.TWITTER_API_BEARER}`,
      }),
    }
  )

  const twitterTrends = await twitterTrendsReq.json()

  const twitterDataFormatted = twitterTrends[0].trends
    .map(
      (item: {
        name: string
        url: string
        promoted_content: any
        query: string
        tweet_volume: number
      }) => item.name
    )
    .join(',')

  const twitterDataSafe = emojiStrip(twitterDataFormatted.replaceAll('#', ''))

  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `Extract keywords from this text:\n\n${twitterDataSafe}\n\n`,
    temperature: 0.3,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0.8,
    presence_penalty: 0,
  })

  const responseSplit = response.data.choices[0].text
    .replaceAll('\n', '')
    .split('-')

  return responseSplit
}

export const generatePrompt = async (keywords: string[]) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `Describe a scene using the following keywords.\n\n${keywords.join(
      ','
    )}`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  return response.data.choices[0].text.split('\n\n')[1]
}
