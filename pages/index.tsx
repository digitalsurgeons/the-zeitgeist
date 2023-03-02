import { NextPage } from 'next'
import Image from 'next/image'
import { useHowItWorks } from '../context/howItWorksContext'
import clientPromise from '../lib/mongodb'
import { NextSeo } from 'next-seo'
import { Layout } from '../components/layout'
import Link from 'next/link'

type HomeProps = {
  items: any[]
}

const Home: NextPage<HomeProps> = ({ items }) => {
  const { howItWorks, setHowItWorks } = useHowItWorks()

  return (
    <Layout>
      <>
        <NextSeo
          title="The Zeitgeist - NFT Collection"
          description="Inspired by culture. Imagined by AI. One piece generated every day."
          canonical={process.env.NEXT_PUBLIC_BASE_URL}
          openGraph={{
            title: 'The Zeitgeist - NFT Collection',
            description: 'Inspired by culture. Imagined by AI. One piece generated every day.',
          }}
        />
        <div className="flex flex-col justify-center px-4 mx-auto max-w-8xl">
          <div className="text-center">
            <h1 className="flex flex-col font-medium">
              <span className="text-9xl">222</span>
              <span className="text-[40px]">Days of history</span>
            </h1>
            <h2 className="mt-8 text-2xl font-medium leading-tight">
              <span className="text-teal-400">Created</span> by AI.{' '}
              <span className="text-teal-400">Inspired</span> by culture.{' '}
              <br className="hidden md:block" />
              <span className="text-teal-400">Memorialized</span> forever on the blockchain.
            </h2>
            <div className="flex flex-col items-center mt-8">
              <Link href="/collection">
                <a className="flex items-center py-[6px] pl-2 pr-6 mt-6 font-medium transition rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-900">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <rect width="26" height="26" rx="13" fill="white" />
                    <path
                      d="M14.6687 13C14.6687 13.9217 13.9215 14.6689 12.9997 14.6689C12.078 14.6689 11.3308 13.9217 11.3308 13C11.3308 12.0783 12.078 11.3311 12.9997 11.3311C13.9215 11.3311 14.6687 12.0783 14.6687 13Z"
                      stroke="#262626"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.69167 13C8.40055 10.743 10.5091 9.1059 13 9.1059C15.4909 9.1059 17.5995 10.743 18.3083 13C17.5995 15.257 15.4909 16.8941 13 16.8941C10.5091 16.8941 8.40053 15.257 7.69167 13Z"
                      stroke="#262626"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  View the Gallery
                </a>
              </Link>
              <a
                className="flex cursor-pointer items-center py-[6px] pl-2 pr-6 mt-6 font-medium transition rounded-full bg-[#2B2B2B] hover:bg-[#494848] text-white"
                onClick={() => setHowItWorks(true)}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <rect width="26" height="26" rx="13" fill="white" />
                  <path
                    d="M17.2974 14.9833C17.1359 14.8218 16.9302 14.7117 16.7062 14.6669L15.3249 14.3906C14.568 14.2392 13.7822 14.3445 13.0918 14.6897L12.9082 14.7815C12.2178 15.1267 11.432 15.2319 10.6751 15.0805L9.55751 14.857C9.17816 14.7811 8.78599 14.8999 8.51243 15.1734M10.6859 8.37177H15.3141L14.7356 8.95029V11.9422C14.7356 12.2491 14.8575 12.5434 15.0745 12.7604L17.9671 15.653C18.696 16.3819 18.1798 17.6282 17.149 17.6282H8.85104C7.82021 17.6282 7.30397 16.3819 8.03288 15.653L10.9255 12.7604C11.1425 12.5434 11.2644 12.2491 11.2644 11.9422V8.95029L10.6859 8.37177Z"
                    stroke="#262626"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                How The Zeitgeist was made
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center w-full h-full mt-16">
            <a
              href="https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/43347402646563209786926491996885735443290871720335129623012736052801996587009"
              target="_blank"
              rel="noreferrer"
            >
              {/* <Image src="/img/222.jpg" alt="222 days of history" width={1192} height={1192} /> */}
              <video autoPlay playsInline loop muted className="object-cover w-full h-full">
                <source src="/video/222.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </a>
          </div>
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

    const items = await db.collection('items').find({}).sort('tokenId', -1).limit(4).toArray()

    const itemsFiltered = items.map((item) => {
      return {
        trend: item.trend,
        prompt: item.prompt,
        image: item.image,
        tokenId: item.tokenId,
        date: item.date,
        openSeaUrl: `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${process.env.NEXT_PUBLIC_ZEITGEIST_CONTRACT_ADDRESS}/${item.tokenId}`,
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
