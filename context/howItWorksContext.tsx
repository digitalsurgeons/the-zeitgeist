import { createContext, useContext, useState } from 'react'

type howItWorksContextType = {
  howItWorks: boolean
  setHowItWorks: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

const howItWorksContextTypeDefaultValues: howItWorksContextType = {
  howItWorks: false,
  setHowItWorks: () => {},
}

const HowItWorksContext = createContext<howItWorksContextType>(howItWorksContextTypeDefaultValues)

export const useHowItWorks = () => {
  return useContext(HowItWorksContext)
}

type Props = {
  children: JSX.Element
}

export const HowItWorksProvider = ({ children }: Props) => {
  const [howItWorks, setHowItWorks] = useState(false)

  const value = {
    howItWorks,
    setHowItWorks,
  }

  return (
    <>
      <HowItWorksContext.Provider value={value}>{children}</HowItWorksContext.Provider>
    </>
  )
}
