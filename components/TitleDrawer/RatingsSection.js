import React from 'react'
import { TitleContext } from '@/context/titleContext'
import { Blockquote, Rating, Skeleton, Text } from '@mantine/core'
import Link from 'next/link'

export const RatingsSection = () => {
  const { item } = React.useContext(TitleContext)
  const { fetchTitleRatings, ratings, loadingratings } = React.useContext(TitleContext)

  React.useEffect(() => {
    fetchTitleRatings(item.id)
    return () => {
    }
  }, [item])

  return (
    <div className='mt-5 flex flex-col gap-3'>
      <Text className='text-lg font-bold'>Ratings:</Text>
      {loadingratings ? (
        <>
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} height={80} radius="md" />
          ))}
        </>
      ) : (
        <>
          {ratings?.items?.length === 0 && <Text className='text-xl text-gray-400'>No ratings for this show yet</Text>}
          {(ratings?.items ?? []).map(item => (
            <div key={item.id} className='border rounded-sm'>
              <Blockquote className='text-sm' cite={(<Link className='text-blue-500 font-normal' href={`/user/${item.author.id}`}>- {item.author.display_name}</Link>)}>
                <Rating defaultValue={item.rating} readOnly className='m-0' size='sm' color='#6FDA86' />
                {item.comment ? item.comment : <Text className='text-gray-200'>No comment</Text>}
              </Blockquote>
            </div>
          ))}
        </>
      )}

    </div>
  )
}