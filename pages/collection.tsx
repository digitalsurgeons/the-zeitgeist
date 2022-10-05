import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import CollectionCalendar from '../components/collectionCalendar'
import { Layout } from '../components/layout'
import { calendarDays } from '../lib/constants'
import clientPromise from '../lib/mongodb'

export type CollectionItem = {
  trend: string
  prompt: string
  image: string
  tokenId: string
  date: string
  openSeaUrl: string
}

export type CalendarDay = {
  date: string
  isCurrentMonth: boolean
  isSelected: boolean
  item: CollectionItem | null | undefined
}

type CollectionProps = {
  collectionCalendarDays: Array<CalendarDay>
}

const Collection: NextPage<CollectionProps> = ({ collectionCalendarDays }) => {
  return (
    <Layout>
      <>
        <NextSeo
          title="The Zeitgeist - NFT Collection"
          description="View the full Zeitgeist collection, minted on the Ethereum blockchain"
          canonical={process.env.NEXT_PUBLIC_BASE_URL + '/collection'}
          openGraph={{
            title: 'The Zeitgeist - NFT Collection',
            description: 'View the full Zeitgeist collection, minted on the Ethereum blockchain',
          }}
        />
        <CollectionCalendar calendarDays={collectionCalendarDays} />
      </>
    </Layout>
  )
}

export default Collection

export const getServerSideProps: GetServerSideProps<CollectionProps> = async () => {
  try {
    const client = await clientPromise
    const db = await client.db()

    const items = await db.collection('items').find({}).sort('tokenId', -1).toArray()

    const itemsFiltered = items.map((item) => {
      return {
        trend: item.trend,
        prompt: item.prompt,
        image: item.image,
        tokenId: item.tokenId,
        date: item.date,
        openSeaUrl: `${process.env.NEXT_PUBLIC_OPENSEA_URL}/${process.env.NEXT_PUBLIC_ZEITGEIST_CONTRACT_ADDRESS}/${item.tokenId}`,
      } as CollectionItem
    })

    const collectionDays = calendarDays.map((day) => {
      const dayItem = itemsFiltered.find((item) => item.date === day.date)
      return {
        ...day,
        item: dayItem ?? null,
      }
    }) as Array<CalendarDay>

    return {
      props: { collectionCalendarDays: collectionDays },
    }
  } catch (e) {
    console.error(e)
    return {
      props: {
        collectionCalendarDays: [],
      },
    }
  }
}
