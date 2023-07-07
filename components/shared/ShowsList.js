import React from 'react'
import { Avatar, Skeleton } from '@mantine/core'
import Link from 'next/link'
import LazyLoad from 'react-lazyload'
import { ShowDrawer } from '../ShowDrawer'
import { ShowContext } from '@/context/showContext'
import { DrawerContext } from '@/context/drawerContext'

const Item = ({ item, setdraweritem }) => {
  return (
    <>
      <div className='flex flex-col gap-1' onClick={() => {
        setdraweritem(item)
      }}>
        <LazyLoad className='relative'>
          <div className='rounded-lg cursor-pointer h-full w-full absolute top-0 left-0 z-10 flex items-center justify-center'>
            <div className='bg-secondary/50 rounded-lg border flex flex-col items-center justify-center p-1 w-full h-full gap-1 text-white font-semibold'>
              {!item.ratings ? (
                <>No rating yet</>
              ) : (
                <> {item.ratings} / 5</>
              )}
            </div>
          </div>
          <Avatar className='rounded-xl bg-secondary h-[340px] relative w-full' src={item?.poster_path ? `https://image.tmdb.org/t/p/original/${item?.poster_path}` : ''} />
        </LazyLoad>
        <Link href={`/tv/${item.id}`} className='font-semibold mt-2'>{item.name} opening show</Link>
      </div>
    </>
  )
}

export const ShowsList = ({ loading, shows, cols_class = 'grid-cols-5' }) => {
  const { setitem } = React.useContext(ShowContext)
  const { open } = React.useContext(DrawerContext)

  return (
    <>
      <div className={`grid ${cols_class} gap-10`}>
        <ShowDrawer />

        {!loading && shows?.map((item, index) => (
          <Item key={index} item={item}
            setdraweritem={(payload) => {
              setitem(payload)
              open()
            }} />
        ))}
        {loading && Array(20).fill(0).map((_, index) => (
          <div key={index} className='flex flex-col gap-4'>
            <Skeleton key={index} className='w-full min-h-[300px]' />
            <Skeleton key={index} className='h-4 w-2/3' />
          </div>
        )
        )}
      </div>
    </>
  )
}