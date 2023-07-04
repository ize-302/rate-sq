// import { useDisclosure } from '@mantine/hooks';
import React from 'react'
import { Drawer, Text, } from '@mantine/core';
import { ACCESS_TOKEN } from '@/utils/constants';
import { getTokenFromCookies } from '@/utils/cookies.utils';
import { verifyToken } from '@/utils/jwt.utils';
import { Rate } from './Rate';
import { Media } from './Media';
import { RatingsSection } from './RatingsSection';

export const MyDrawer = ({ opened, open, close, item }) => {
  const token = getTokenFromCookies(ACCESS_TOKEN)
  const [user, setuser] = React.useState({})

  const getUser = async () => {
    const user = await verifyToken(token)
    setuser(user)
  }

  React.useEffect(() => {
    getUser()
    return () => {
      setuser({})
    }
  }, [token])



  return (
    <>
      <Drawer opened={opened} onClose={close} title={(<Text className='text-xl font-semibold'>{item.name}</Text>)} size={'xl'}
        position='right'>
        {/* any */}
        {/* can watch, can see ratings, */}
        {/* guest? */}
        {/*  login to rate */}

        {/* user logged in: */}
        {/* can add embed, can rate  */}
        <Media name={item.name} embed_code={item.embed_code} id={item.show_id} />
        {item.exists && (
          <>
            <Rate user={user} id={item.show_id} />
            <RatingsSection />
          </>
        )}
      </Drawer>
    </>
  );
}