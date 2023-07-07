import AccountLayout from '@/components/layouts/Account.layout'
import { PaginationComponent } from '@/components/shared/PaginationComponent'
import { RatingContext } from '@/context/ratingContext'
import { UserContext } from '@/context/userContext'
import { Avatar, Blockquote, Rating, Skeleton, Text } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function AccountRatingsPage() {
  const { fetchUserRatings, ratings, loading, setloading } = React.useContext(RatingContext)
  const { user } = React.useContext(UserContext)
  const router = useRouter()


  React.useEffect(() => {
    setloading(true)
    fetchUserRatings(user?.id)
  }, [router.pathname]) // eslint-disable-line


  return (
    <AccountLayout title='My ratings'>
      <div className='grid gap-4'>
        {loading && Array(5).fill(0).map((_, i) => (
          <div className='flex gap-4 mb-2' key={i}>
            <Skeleton height={120} className='w-24' radius="md" />
            <div className='flex flex-col gap-4 w-full'>
              <Skeleton height={20} className='w-40' radius="md" />
              <Skeleton height={20} radius="md" />
              <Skeleton height={20} radius="md" />
            </div>
          </div>
        ))}
        {!loading && (
          <>
            {(ratings?.items ?? []).map(item => (
              <div key={item.index} className='p-5 rounded-md flex gap-4'>
                <img width={'80px'} className='rounded-md' src={item?.show?.poster_path ? `https://image.tmdb.org/t/p/original/${item?.show?.poster_path}` : ''} />
                <div className='w-full'>
                  <Text className='cursor-pointer text-md font-semibold mb-1'>
                    {item.show.name}
                  </Text>
                  <Blockquote className='bg-gray-100 rounded-md text-sm w-full'>
                    <Rating defaultValue={item.rating} readOnly className='mb-1' size='sm' color='#6FDA86' />
                    {item.comment}
                  </Blockquote>
                </div>
              </div>
            ))}
            <PaginationComponent data={ratings} />
          </>
        )}
      </div>
    </AccountLayout>
  )
}