import NewsAPI from 'newsapi'
import googleTrends from 'google-trends-api'
import { Configuration, OpenAIApi } from 'openai'

export const getTrend = async (date: string) => {
  const trendReq = await googleTrends.dailyTrends({
    trendDate: new Date(date),
    geo: 'US',
  })

  const trendJSON = JSON.parse(trendReq)

  const trend = trendJSON.default.trendingSearchesDays[0].trendingSearches[0].title.query

  return trend
}

export const getHeadline = async (date: string, trend: string) => {
  const newsApi = new NewsAPI(process.env.NEWS_API_KEY)

  const newsApiReq = await newsApi.v2.everything({
    q: trend,
    from: date,
    to: date,
    language: 'en',
    sortBy: 'relevancy',
  })

  const headline = newsApiReq.articles[0].title

  return headline
}

export const generatePrompt = async (headline: string) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `Describe an amazing scene based on the following "${headline}"`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  if (!response) {
    return ''
  }

  const prompt = String(response?.data?.choices?.[0]?.text?.split('\n\n')[1])

  return prompt
}
