import { NextPage } from 'next'
import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'

type HomeProps = {
  items: any[]
}

const Home: NextPage<HomeProps> = ({ items }) => {
  return (
    <>
      <Head>
        <title>The Zeitgeist</title>
      </Head>
      <div className="w-full h-full min-h-screen text-white bg-zinc-900">
        <header className="flex items-center p-12 space-between ">
          <a
            href="#"
            className="mx-auto font-serif text-2xl text-center xl:text-left xl:mx-0">
            <strong className="font-bold">The Zeitgeist</strong> - NFT
            Collection
          </a>
          <nav className="hidden ml-auto xl:flex">
            <ul className="flex gap-16 items-center text-lg font-medium translate-y-[1px]">
              <li>
                <a
                  href="#"
                  className="pb-1 transition duration-300 border-b border-transparent hover:border-white">
                  About The Collection
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="pb-1 transition duration-300 border-b border-transparent hover:border-white">
                  The Gallery
                </a>
              </li>
            </ul>
            <ul className="flex gap-6 items-center text-lg mx-16 font-medium translate-y-[1px]">
              <li>
                <a
                  href="#"
                  className="text-white transition duration-300 hover:text-teal-500">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white transition duration-300 hover:text-teal-500">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white transition duration-300 hover:text-teal-500">
                  <FaDiscord />
                </a>
              </li>
            </ul>
            <button className="flex items-center px-6 py-3 transition duration-300 bg-white rounded-lg text-zinc-900 hover:bg-teal-500 hover:text-white">
              Connect Wallet
            </button>
          </nav>
        </header>
        <div className="flex flex-col justify-center px-4 mx-auto max-w-7xl">
          <div className="mt-24 space-y-8 text-center">
            <h1 className="text-4xl leading-tight md:text-5xl xl:text-7xl">
              <span className="text-teal-400">Created</span> by A.I,{' '}
              <span className="text-teal-400">inspired</span> by culture.{' '}
              <br className="hidden md:block" />
              One piece <span className="text-teal-400">generated</span> every
              day.
            </h1>
            <a
              href="#"
              className="inline-block text-lg italic text-gray-300 transition duration-300 border-b border-dashed hover:border-transparent">
              How does it work?
            </a>
          </div>

          <div className="flex flex-wrap items-stretch mt-32">
            {items.map((item, index) => {
              return (
                <div className="w-full px-6 py-4 md:py-8 md:w-1/2" key={index}>
                  <a
                    href="#"
                    className="block h-full p-6 bg-white rounded-md shadow-lg transition duration-300 hover:scale-[1.02]">
                    <img src={item.image} className="rounded-md" />
                    <div className="py-2 text-zinc-900">
                      <h3 className="my-4 text-lg font-bold">
                        #{item.tokenId} - {item.trend}
                      </h3>
                      <p className="italic text-gray-500">
                        &ldquo;{item.prompt}&rdquo;
                      </p>
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
        <footer className="px-4 py-10 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex flex-col items-center gap-8">
            <ul className="flex gap-6 items-center text-lg mx-16 font-medium translate-y-[1px]">
              <li>
                <a
                  href="#"
                  className="text-white transition duration-300 hover:text-teal-500">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white transition duration-300 hover:text-teal-500">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white transition duration-300 hover:text-teal-500">
                  <FaDiscord />
                </a>
              </li>
            </ul>
          </nav>
          <p className="mt-8 text-base text-center text-gray-300">
            &copy; 2022 The ZeitGeist. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  )
}

export default Home

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = await client.db()

    const items = await db.collection('items').find({}).limit(20).toArray()

    const itemsFiltered = items.map((item) => {
      return {
        trend: item.trend,
        prompt: item.prompt,
        image: item.image,
        tokenId: item.tokenId,
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
