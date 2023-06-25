import React from 'react'
import { ACCESS_TOKEN } from '@/utils/constants'
import { getTokenFromCookies } from '@/utils/cookies.utils'
import { verifyToken } from '@/utils/jwt.utils'
import Layout from '@/components/layouts/Layout'

export default function Home() {
  const token = getTokenFromCookies(ACCESS_TOKEN)
  const user = verifyToken(token)

  return <Layout>

  </Layout>
}