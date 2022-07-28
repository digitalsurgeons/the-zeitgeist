import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { HowItWorks } from '../components/howItWorks'

type Props = {
  children: JSX.Element
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <div
        className="w-full h-full min-h-screen text-white bg-black bg-top bg-no-repeat bg-contain"
        style={{ backgroundImage: 'url(/img/bg.svg)' }}
      >
        <Header />
        {children}
        <Footer />
      </div>
      <HowItWorks />
    </>
  )
}
