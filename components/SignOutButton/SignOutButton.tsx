import React from 'react'
import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <button
      onClick={() => {
        console.log('I should be logging out but im not bc im dumb')
        // signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` })
      }}
    >
      Sign Out
    </button>
  )
}

export default SignOutButton
