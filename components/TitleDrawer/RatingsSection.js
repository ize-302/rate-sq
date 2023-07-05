import React from 'react'
import { TitleContext } from '@/context/titleContext'
import { Blockquote, Rating, Skeleton, Text } from '@mantine/core'
import Link from 'next/link'

export const RatingsSection = () => {
  const { fetchRatings, item, ratings, loading } = React.useContext(TitleContext)

  React.useEffect(() => {
    fetchRatings(item.id)
    return () => {
    }
  }, [item])


  return (
    <div className='mt-5 flex flex-col gap-3'>
      <Text className='text-lg font-bold'>Ratings:</Text>
      {loading ? (
        <>
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} height={80} radius="md" />
          ))}
        </>
      ) : (
        <>
          {ratings.length === 0 && <Text className='text-xl text-gray-400'>No ratings for this show yet</Text>}
          {ratings?.map(item => (
            <div key={item.id} className='border rounded-md'>
              <Blockquote cite={(<Link className='text-blue-500 font-normal' href={`/user/${item.author.id}`}>- {item.author.display_name}</Link>)}>
                <Rating defaultValue={item.rating} readOnly className='m-0' size='sm' color='#6FDA86' />
                {item.comment}
              </Blockquote>
            </div>
          ))}
        </>
      )}

    </div>
  )
}