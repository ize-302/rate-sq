// import { useDisclosure } from '@mantine/hooks';
import React from 'react'
import { Drawer, Text, } from '@mantine/core';
import { RateShow } from './RateShow';
import { Media } from './Media';
import { RatingsSection } from './RatingsSection';
import { ShowContext } from '@/context/showContext';
import { DrawerContext } from '@/context/drawerContext';

export const ShowDrawer = () => {
  const { item } = React.useContext(ShowContext)
  const { opened, close } = React.useContext(DrawerContext)

  return (
    <>
      <Drawer opened={opened} onClose={close} show={(<Text className='text-xl font-semibold'>{item?.name}</Text>)} size={'xl'}
        position='right'>
        <Media item={item} />
        {item?.exists && (
          <>
            <RateShow />
            <RatingsSection />
          </>
        )}
      </Drawer>
    </>
  );
}