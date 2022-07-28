import clsx from 'clsx'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { HowItWorks } from '../components/howItWorks'
import { useHowItWorks } from '../context/howItWorksContext'

type Props = {
  children: JSX.Element
}

export const Layout = ({ children }: Props) => {
  const { howItWorks } = useHowItWorks()
  return (
    <>
      <div
        className={clsx(
          'w-full h-full min-h-screen text-white bg-black bg-top bg-no-repeat bg-contain',
          howItWorks ? 'blur-sm' : '',
        )}
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
