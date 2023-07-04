import React from 'react'
import { Avatar, Menu, Skeleton } from '@mantine/core'
import { IconDisc, IconDots, IconBrandYoutube, IconStarHalfFilled } from '@tabler/icons-react'
import Link from 'next/link'
import LazyLoad from 'react-lazyload'
import { RateTSQ } from '../RateTSQ'
import { useDisclosure } from '@mantine/hooks'

export const TitlesList = ({ loading, titles }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [TSQtoRate, setTSQtoRate] = React.useState({})

  return (
    <>
      <RateTSQ item={TSQtoRate} opened={opened} open={open} close={close} />

      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
        {!loading && titles?.map((item, index) => (
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
                  {item.ratings} / 5</div>
              </div>
              <Avatar className='rounded-lg bg-secondary h-[340px] relative w-full' src={item?.poster_path ? `https://image.tmdb.org/t/p/original/${item?.poster_path}` : ''} />
            </LazyLoad>
            <Link href={`/tv/${item.show_id}`} className='font-semibold mt-2'>{item.name}</Link>
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
    </>
  )
}