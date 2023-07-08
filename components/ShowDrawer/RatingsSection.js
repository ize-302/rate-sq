import React from 'react'
import { ShowContext } from '@/context/showContext'
import { Blockquote, Rating, Skeleton, Text } from '@mantine/core'
import { UserContext } from '@/context/userContext'
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export const RatingsSection = () => {
  const { item } = React.useContext(ShowContext)
  const { fetchShowRatings, ratings, loadingratings } = React.useContext(ShowContext)
  const { user } = React.useContext(UserContext)

  React.useEffect(() => {
    fetchShowRatings(item.id)
    return () => {
    }
  }, [item]) // eslint-disable-line

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
            <div key={item.id} className={`border rounded-md ${user.display_name === item.author.display_name && 'bg-green-50 border border-green-500'}`}>
              <Blockquote className='text-sm' cite={(<Text className='font-normal'>- {item.author.display_name} ({dayjs().to(dayjs(item.updated_at))})</Text>)}>
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