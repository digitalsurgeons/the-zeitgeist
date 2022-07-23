/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

const AccessDenied = () => {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>You must be signed in to view this page</p>
      <a
        href="/api/auth/signin"
        onClick={(e) => {
          e.preventDefault()
          signIn()
        }}
      >
        Sign In
      </a>
    </div>
  )
}

export default AccessDenied
