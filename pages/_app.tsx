import { MantineProvider } from '@mantine/core'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import { HowItWorksProvider } from '../context/howItWorksContext'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <HowItWorksProvider>
          <>
            <DefaultSeo
              openGraph={{
                type: 'website',
                locale: 'en_IE',
                url: process.env.NEXT_PUBLIC_BASE_URL,
                site_name: 'The Zeitgeist',
                images: [
                  {
                    url: process.env.NEXT_PUBLIC_BASE_URL + '/img/share.jpg',
                    width: 800,
                    height: 600,
                    alt: 'Og Image Alt',
                    type: 'image/jpeg',
                  },
                ],
              }}
              twitter={{
                handle: '@thezeitgeistAI',
                site: '@thezeitgeistAI',
                cardType: 'summary_large_image',
              }}
            />
            <Component {...pageProps} />
          </>
        </HowItWorksProvider>
      </MantineProvider>
    </SessionProvider>
  )
}

export default MyApp
