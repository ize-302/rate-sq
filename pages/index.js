import React from 'react'
import { ACCESS_TOKEN } from '@/utils/constants'
import { getTokenFromCookies } from '@/utils/cookies.utils'
import { verifyToken } from '@/utils/jwt.utils'

export default function Home() {
  const token = getTokenFromCookies(ACCESS_TOKEN)
  const user = verifyToken(token)

  return <h1>
    {user ? user.email : 'not verified'}
  </h1>
}