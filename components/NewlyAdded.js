import React from 'react'
import { Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { TitlesList } from './shared/TitlesList';
import { TitleContext } from '@/context/titleContext';
import { PaginationComponent } from './shared/PaginationComponent';

export const NewlyAdded = () => {
  const router = useRouter()
  const { fetchTitles, data, setdata, setloading, loading } = React.useContext(TitleContext)

  React.useEffect(() => {
    setloading(true)
    fetchTitles()
    return () => {
      setdata({})
    }
  }, [router]) // eslint-disable-line

  return (
    <div>
      <Text className='text-center text-xl md:text-2xl mb-10'>Newly Added</Text>

      <TitlesList loading={loading} titles={data.items} />

      <PaginationComponent data={data} />

    </div>
  )
}