// import { useDisclosure } from '@mantine/hooks';
import React from 'react'
import { Drawer, Text, } from '@mantine/core';
import { Rate } from './Rate';
import { Media } from './Media';
import { RatingsSection } from './RatingsSection';
import { TitleContext } from '@/context/TitleContext';

export const MyDrawer = ({ opened, open, close }) => {
  const { item, loading } = React.useContext(TitleContext)

  return (
    <>
      <Drawer opened={opened} onClose={close} title={(<Text className='text-xl font-semibold'>{item?.name}</Text>)} size={'xl'}
        position='right'>
        {/* any */}
        {/* can watch, can see ratings, */}
        {/* guest? */}
        {/*  login to rate */}

        {/* user logged in: */}
        {/* can add embed, can rate  */}
        {/* {loading ? <>loading...</> : (
          <> */}
        <Media item={item} />
        {item?.exists && (
          <>
            <Rate />
            <RatingsSection />
          </>
        )}
        {/* </> */}
        {/* )} */}



      </Drawer>
    </>
  );
}