import React from 'react'
import { Navigation } from '@/components/Navigation'
import { ACCESS_TOKEN } from '@/utils/constants'
import { getTokenFromCookies } from '@/utils/cookies.utils'
import { verifyToken } from '@/utils/jwt.utils'
import { Group, Rating, Text } from '@mantine/core'

export default function Layout({ children }) {
  const token = getTokenFromCookies(ACCESS_TOKEN)
  const [user, setuser] = React.useState({})

  const getUser = async () => {
    const user = await verifyToken(token)
    setuser(user)
  }

  React.useEffect(() => {
    getUser()
    return () => {
      setuser({})
    }
  }, [token])


  return (
    <div className="min-h-screen flex flex-col w-full bg-white">
      <Navigation user={user} />
      <div className={`w-full flex-1`}>
        <div>
          {children}
        </div>
      </div>
      <div className='bg-secondary border-t text-center flex items-center flex-col py-10'>
        <Group className='flex flex-col gap-[0px] items-center'>
          <Text className='m-0 font-semibold text-xl' color='#fff'>RateTSQ</Text>
          <Rating defaultValue={5} className='m-0' size='sm' color='#fff' />
        </Group>
        <Text color='white' size='sm' className='mt-10'>Built with 🔥  by <a className='underline' target="_blank" href="https://github.com/ize-302">Adavize Hassan</a></Text>
      </div>
    </div>
  )
}