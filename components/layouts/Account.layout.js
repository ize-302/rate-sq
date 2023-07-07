import React from 'react'
import Layout from './Layout'
import { Container } from './Container'
import Link from 'next/link'
import { Text } from '@mantine/core'
import { IconDeviceTvOld, IconLogout, IconStars, IconUser } from '@tabler/icons-react'
import { removeTokenFromCookies } from '@/utils/cookies.utils'
import { useRouter } from 'next/router'

export default function AccountLayout({ children, title }) {
  const router = useRouter()

  const signOut = () => {
    removeTokenFromCookies()
    router.push('/')
  }

  const classes = (path) => `flex items-center p-4 text-secondary hover:bg-gray-100 gap-2 ${router.pathname == path ? "bg-green-50 border-r-4 border-primary" : ""}`

  return (
    <Layout>
      <Container>
        <div className='flex flex-col lg:flex-row w-full my-10 relative'>
          <div className='lg:w-2/6 mb-5'>
            <div className='border  sticky top-0'>
              <div className="space-y-2 font-medium">
                <Link href="/account" className={classes('/account')}>
                  <IconUser className='text-secondary' size={20} /> Account
                </Link>
                <Link href="/account/ratings" className={classes('/account/ratings')}>
                  <IconStars className='text-secondary' size={20} /> My ratings
                </Link>
                <Link href="/account/shows" className={classes('/account/shows')}>
                  <IconDeviceTvOld className='text-secondary' size={20} /> Submitted shows
                </Link>
                <Text
                  className="p-4 text-red-500 cursor-pointer hover:bg-gray-100 flex gap-2 items-center"
                  onClick={() => signOut()}
                >
                  <IconLogout color='red' size={20} /> Sign out
                </Text>
              </div>
            </div>
          </div>
          <div className='w-full lg:pl-10'>
            <Text className='text-2xl font-semibold text-gray-700 mb-10'>{title}</Text>
            {children}
          </div>
        </div>
      </Container>
    </Layout>
  )
}