require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')
const emojiStrip = require('emoji-strip')
const googleTrends = require('google-trends-api')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const generateKeywords = async () => {
  const trendReq = await googleTrends.dailyTrends({
    trendDate: new Date('2022-07-10'),
    geo: 'US',
  })

  const trendJSON = JSON.parse(trendReq)

  const trend =
    trendJSON.default.trendingSearchesDays[0].trendingSearches[0].title.query

  console.log(trend)

  const twitterTweetsReq = await fetch(
    `https://api.twitter.com/1.1/search/tweets.json?q=${trend}&exclude=hashtags&count=100&result_type=popular`,
    {
      headers: new Headers({
        Authorization: `Bearer ${process.env.TWITTER_API_BEARER}`,
      }),
    }
  )

  console.log(
    `https://api.twitter.com/1.1/search/tweets.json?q=${trend}&exclude=hashtags&count=100&result_type=popular`
  )

  const twitterTweets = await twitterTweetsReq.json()

  const twitterTweetsFormatted = twitterTweets.statuses
    .map((item: any) => item.text)
    .join(' ')

  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `Extract list of keywords from this text:\n\n${twitterTweetsFormatted}\n\n`,
    temperature: 0.3,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0.8,
    presence_penalty: 0,
  })

  const responseSplit = response.data.choices[0].text
    .replace(/\n|-/g, ' ')
    .trim()

  return responseSplit
}

export const generatePrompt = async (keywords: string) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `Describe an amazing scene based on following words.\n\n${keywords}`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  return response.data.choices[0].text.split('\n\n')[1]
}
