import React from 'react'
import { Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { ShowsList } from './shared/ShowsList';
import { ShowContext } from '@/context/showContext';
import { PaginationComponent } from './shared/PaginationComponent';

export const NewlyAdded = () => {
  const router = useRouter()
  const { fetchShows, data, setdata, setloading, loading } = React.useContext(ShowContext)

  React.useEffect(() => {
    setloading(true)
    fetchShows()
    return () => {
      setdata({})
    }
  }, [router]) // eslint-disable-line

  return (
    <div>
      <Text className='text-center text-xl md:text-2xl mb-10'>Newly Added</Text>

      <ShowsList loading={loading} shows={data.items} />

      <PaginationComponent data={data} />

    </div>
  )
}