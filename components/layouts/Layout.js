import React from 'react'
import { Navigation } from '@/components/Navigation'
import { ACCESS_TOKEN } from '@/utils/constants'
import { getTokenFromCookies } from '@/utils/cookies.utils'
import { verifyToken } from '@/utils/jwt.utils'
import { Group, Rating, Text } from '@mantine/core'

export default function Layout({ children }) {
  const token = getTokenFromCookies(ACCESS_TOKEN)
  const [user, setuser] = React.useState({})

  React.useEffect(() => {
    const user = verifyToken(token)
    setuser(user)

    return () => {
      setuser({})
    }
  }, [token])

  return (
    <div className="min-h-screen flex flex-col w-full bg-white">
      <Navigation user={user} />
      <div className={`w-full flex-1`}>
        <div className="max-w-7xl mx-auto px-4 flex gap-20">
          {children}
        </div>
      </div>
      <div className='border-t text-center flex justify-center py-5'>
        <Group className='flex flex-col gap-[0px] items-start'>
          <Text className='m-0 font-semibold text-xl' color='gray'>OstRating</Text>
          <Rating defaultValue={2} className='m-0' color='gray' />
        </Group>
      </div>
    </div>
  )
}