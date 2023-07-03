import React from 'react'
import { Avatar, Skeleton, Text, Menu, Button } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { IconDots, IconStarHalfFilled, IconBrandYoutube, IconDisc } from '@tabler/icons-react';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import NumberAbbreviate from 'number-abbreviate';
import { RateTSQ } from './RateTSQ';
import { useDisclosure } from '@mantine/hooks';

export const Trending = () => {
  const [data, setdata] = React.useState({})
  const router = useRouter()
  const [loading, setloading] = React.useState(true)
  const page = router.query.page ? router.query.page : 1
  const [TSQtoRate, setTSQtoRate] = React.useState({})
  const [opened, { open, close }] = useDisclosure(false);

  React.useEffect(() => {
    setloading(true)
    axios.get(`/api/v1/trending/tv?page=${page}`).then(response => {
      setdata(response.data)
      setloading(false)
    }).catch(err => {
      console.log(err)
      setloading(false)
    })

    return () => {
      setdata({})
    }
  }, [router])


  return (
    <div>
      <RateTSQ item={TSQtoRate} opened={opened} open={open} close={close} />
      <Text className='text-center text-xl md:text-2xl mb-10'>Trending TV Shows</Text>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
        {!loading && data.results?.map((item, index) => (
          <div key={index} className='flex flex-col gap-1'>
            <LazyLoad className='relative'>
              <div className='rounded-lg cursor-pointer h-full w-full absolute top-0 left-0 z-10 flex items-center justify-center'>
                <Menu shadow="md" position='bottom-end' withArrow>
                  <Menu.Target>
                    <div className='bg-white/50 flex items-center justify-center top-1 right-1 h-6 w-6 absolute rounded-full'> <IconDots size='sm' color='black' /></div>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<IconBrandYoutube size={14} />}>Play TSQ</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item onClick={() => {
                      setTSQtoRate(item)
                      open()
                    }} icon={<IconStarHalfFilled size={14} />}>Rate TSQ</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <div className='bg-secondary/50 rounded-full border border-primary flex flex-col items-center justify-center p-1 w-20 h-20 gap-1 text-primary font-semibold'>
                  <IconDisc size='xs' />
                  4.5</div>
              </div>
              <Avatar className='rounded-lg bg-secondary h-[340px] relative w-full' src={item?.poster_path ? `https://image.tmdb.org/t/p/original/${item?.poster_path}` : ''} />
            </LazyLoad>
            <Link href={`/${item.media_type}/${item.id}`} className='font-semibold mt-2'>{item.original_name || item.original_title}</Link>
          </div>
        ))}
        {loading && Array(20).fill(0).map((_, index) => (
          <div key={index} className='flex flex-col gap-4'>
            <Skeleton key={index} className='w-full min-h-[250px]' />
            <Skeleton key={index} className='h-4 w-2/3' />
          </div>
        )
        )}
      </div>


      <div className="flex flex-col items-center mt-10">
        <span className="text-sm text-gray-700">
          Showing <span className="font-semibold text-gray-900">1</span> to <span className="font-semibold text-gray-900">10</span> of <span className="font-semibold text-gray-900">{NumberAbbreviate(data.total_results)}</span> Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button onClick={() => router.push({ query: { page: Number(page) - 1 } })} className="px-4 py-2 text-sm font-medium text-primary bg-secondary rounded-l hover:bg-gray-900 ">
            Prev
          </button>
          <button onClick={() => router.push({ query: { page: Number(page) + 1 } })} className="px-4 py-2 text-sm font-medium text-primary bg-secondary border-0 border-l border-gray-700 rounded-r hover:bg-gray-900">
            Next
          </button>
        </div>
      </div>

    </div>
  )
}