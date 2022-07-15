import { Header } from '../components/header'
import { Footer } from '../components/footer'

type Props = {
  children: JSX.Element
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="w-full h-full min-h-screen text-white bg-zinc-900">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}
