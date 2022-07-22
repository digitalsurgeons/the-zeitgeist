import { NextPage } from 'next'
import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { Layout } from '../components/layout'
import { Button } from '../components/button'

type HomeProps = {
  items: any[]
}

const Home: NextPage<HomeProps> = ({ items }) => {
  return (
    <Layout>
      <>
        <Head>
          <title>The Zeitgeist</title>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        <div className="flex flex-col justify-center px-4 mx-auto max-w-8xl">
          <div className="mt-12 space-y-8 text-center lg:mt-24">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl xl:text-7xl">
              <span className="text-teal-400">Created</span> by A.I,{' '}
              <span className="text-teal-400">inspired</span> by culture.{' '}
              <br className="hidden md:block" />
              One piece <span className="text-teal-400">generated</span> every day.
            </h1>
            <a
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 text-white transition rounded-full bg-zinc-700 hover:bg-zinc-600"
            >
              <AiFillQuestionCircle className="mr-2 text-lg" />
              How does it work?
            </a>
          </div>

          <div className="grid max-w-5xl grid-cols-1 mx-auto mt-32 md:grid-cols-2 gap-x-8 gap-y-20">
            {items.map((item, index) => {
              return (
                <a
                  key={index}
                  href="#"
                  className="block h-full shadow-lg transition duration-300 relative hover:scale-[1.02] border border-t-0 border-zinc-700"
                >
                  <div className="absolute top-0 left-0 inline-flex items-center justify-center p-6 text-3xl bg-teal-500 text-zinc-700">
                    #
                    <span className="font-serif -translate-y-[5px] text-black font-bold">
                      {item.tokenId}
                    </span>
                  </div>
                  <img src={item.image} />
                  <div className="p-6 space-y-4 text-white">
                    <h3 className="flex justify-between mt-2 mb-1 text-xl font-bold">
                      {item.trend}
                      <span className="text-lg text-gray-500">{item.date}</span>{' '}
                    </h3>
                    <p className="text-lg">{item.prompt}</p>
                  </div>
                </a>
              )
            })}
          </div>

          <Button className="mt-12">View full collection</Button>
        </div>
      </>
    </Layout>
  )
}

export default Home

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = await client.db()

    const items = await db.collection('items').find({}).sort('tokenId', -1).limit(20).toArray()

    const itemsFiltered = items.map((item, idx) => {
      return {
        trend: item.trend,
        prompt: item.prompt,
        image: item.image,
        tokenId: item.tokenId ?? idx,
        date: item.date,
      }
    })

    return {
      props: { items: itemsFiltered },
    }
  } catch (e) {
    console.error(e)
    return {
      props: {},
    }
  }
}
