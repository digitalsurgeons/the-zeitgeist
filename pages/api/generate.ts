import type { NextApiRequest, NextApiResponse } from 'next'
import googleTrends from 'google-trends-api'
import NewsAPI from 'newsapi'
import { Configuration, OpenAIApi } from 'openai'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const datObj = new Date()
  const date = req.query.date
    ? String(req.query.date)
    : `${datObj.getFullYear()}-${datObj.getMonth() + 1}-${datObj.getDate()}`

  // get daily trend from google trends
  const getTrend = async () => {
    const trendReq = await googleTrends.dailyTrends({
      trendDate: new Date(date),
      geo: 'US',
    })

    const trendJSON = JSON.parse(trendReq)

    const trend =
      trendJSON.default.trendingSearchesDays[0].trendingSearches[0].title.query

    return trend
  }

  const getHeadline = async (trend: string) => {
    const newsApi = new NewsAPI(process.env.NEWS_API_KEY)

    const newsApiReq = await newsApi.v2.everything({
      q: trend,
      from: date,
      to: date,
      language: 'en',
      sortBy: 'popularity',
    })

    const headline = newsApiReq.articles[0].title

    return headline
  }

  const generatePrompt = async (headline: string) => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(configuration)

    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `Describe an amazing scene based on ${headline}`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    if (!response) {
      return ''
    }

    const prompt = response?.data?.choices?.[0]?.text?.split('\n\n')[1]

    return prompt
  }

  const generateImage = async () => {}

  const trend = await getTrend()
  const headline = await getHeadline(trend)
  const prompt = await generatePrompt(headline)

  res.json({
    trend,
    headline,
    prompt,
  })
}
