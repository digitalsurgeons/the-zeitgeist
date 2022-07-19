import { NextPage } from 'next'
import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { Layout } from '../components/layout'

type HomeProps = {
  items: any[]
}

const Home: NextPage<HomeProps> = ({ items }) => {
  return (
    <Layout>
      <>
        <Head>
          <title>The Zeitgeist</title>
        </Head>
        <div className="flex flex-col justify-center px-4 mx-auto max-w-8xl">
          <div className="mt-24 space-y-8 text-center">
            <h1 className="text-4xl leading-tight md:text-5xl xl:text-7xl">
              <span className="text-teal-400">Created</span> by A.I,{' '}
              <span className="text-teal-400">inspired</span> by culture.{' '}
              <br className="hidden md:block" />
              One piece <span className="text-teal-400">generated</span> every day.
            </h1>
            <a
              href="#"
              className="inline-block text-lg italic text-gray-300 transition duration-300 border-b border-dashed hover:border-transparent"
            >
              How does it work?
            </a>
          </div>

          <div className="grid gap-4 mt-32 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, index) => {
              return (
                <div className="" key={index}>
                  <a
                    href="#"
                    className="block h-full p-4 bg-white rounded-md shadow-lg transition duration-300 hover:scale-[1.02]"
                  >
                    <img src={item.image} className="rounded-md" />
                    <div className="py-2 text-zinc-900">
                      <h3 className="mt-2 mb-1 text-lg font-bold">{item.trend} </h3>
                      <h4 className="text-gray-500">{item.date}</h4>
                    </div>
                  </a>
                </div>
              )
            })}
          </div>

          <button className="flex items-center px-6 py-3 mx-auto mt-12 transition duration-300 bg-white rounded-lg mb-28 text-zinc-900 hover:bg-teal-500 hover:text-white">
            View full collection
          </button>
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

    const itemsFiltered = items.map((item) => {
      return {
        trend: item.trend,
        prompt: item.prompt,
        image: item.image,
        tokenId: item.tokenId,
        date: item.date,
      }
    })

    const itemsFiltered2 = items.map((item) => {
      return {
        trend: item.trend,
        prompt: item.prompt,
        image: item.image,
        tokenId: item.tokenId,
        date: item.date,
      }
    })

    return {
      props: { items: itemsFiltered.concat(itemsFiltered2) },
    }
  } catch (e) {
    console.error(e)
    return {
      props: {},
    }
  }
}
