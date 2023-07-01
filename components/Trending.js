import React from 'react'
import { Carousel } from '@mantine/carousel';
import { Avatar, Text } from '@mantine/core';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IconPlayerPlay } from '@tabler/icons-react';
import Link from 'next/link';

export const Trending = () => {
  const [data, setdata] = React.useState({})
  const router = useRouter()

  React.useEffect(() => {
    axios.get(`/api/v1/trending/tv?page=2`).then(response => {
      console.log(response.data)
      setdata(response.data)
    }).catch(err => {
      console.log(err)
    })

    return () => {
      setdata({})
    }
  }, [])


  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
        {data.results?.map((item, index) => (
          <div key={index} className='flex flex-col gap-1 relative' >
            <Avatar className='rounded-lg bg-red-400 min-h-[400px] md:min-h-[265px] relative w-full' src={item?.poster_path ? `https://image.tmdb.org/t/p/original/${item?.poster_path}` : ''} />
            <Link href={`/${item.media_type}/${item.id}`} className='font-semibold'>{item.original_name || item.original_title}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}