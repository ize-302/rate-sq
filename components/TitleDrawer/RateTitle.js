import React from 'react'
import { Button, Group, Text, Rating, Textarea, Accordion, Blockquote } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { TitleContext } from '@/context/titleContext';
import { UserContext } from '@/context/userContext';
import axios from 'axios';
import { getTokenFromCookies } from '@/utils/cookies.utils';
import { ACCESS_TOKEN } from '@/utils/constants';
import { IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { DrawerContext } from '@/context/drawerContext';
import { supabase } from '@/supabase';

export const RateTitle = () => {
  const { item, fetchTitles, handleSearch } = React.useContext(TitleContext)
  const { close } = React.useContext(DrawerContext)
  const { user } = React.useContext(UserContext)
  const token = getTokenFromCookies(ACCESS_TOKEN)
  const [loading, setloading] = React.useState(false)
  const router = useRouter()
  const { query } = router.query;
  const [is_rated, setis_rated] = React.useState(false)

  const form = useForm({
    initialValues: {
      rating: 0,
      comment: '',
    },
    validate: {
      rating: (value) => value ? null : 'Add a rating',
    },
  });

  const isRated = async () => {
    const result = await supabase.from('ratings').select("*", { count: 'exact' }).eq('author', user.id).eq('show_id', item.id)
    setis_rated(result.count ? true : false)
  }

  React.useEffect(() => {
    isRated()
    return () => {
      setis_rated(false)
    }
  }, [item])


  const handlerating = (values) => {
    setloading(true)
    axios.post(`/api/v1/titles/${item?.id}/ratings`, {
      rating: values.rating,
      comment: values.comment
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setloading(false)
      router?.pathname === '/search' ? handleSearch(query) : fetchTitles()
      close()
      notifications.show({
        title: response.data.success,
        message: "",
        color: "green",
        icon: <IconCheck />,
      });
    }).catch(err => {
      setloading(false)
      console.log(err)
    })
  }

  return (
    <>
      {is_rated && (
        <div className='bg-blue-50 border border-blue-400 text-blue-400 p-3 rounded-md mt-4'>You have already rated this title</div>
      )}
      {!is_rated && (
        <Accordion defaultValue="customization">
          <Accordion.Item value="customization" className='mt-5 bg-green-100 border border-green-400 rounded-lg'>
            <Accordion.Control className='hover:bg-transparent'>
              <Text className='font-semibold'>Leave a rating</Text>
            </Accordion.Control>
            <Accordion.Panel className='border-t border-green-400 py-2'>
              {(user && !is_rated) && (
                <form onSubmit={form.onSubmit((values) => handlerating(values))} className='flex flex-col gap-4  mt-0 bg-green-100'>
                  <Group className='items-center'>
                    Rating:
                    <Rating
                      {...form.getInputProps('rating')}
                      onChange={(value) => form.setFieldValue('rating', value)} fractions={1} defaultValue={form.values.rating} color='#6FDA86' size='md' />
                  </Group>
                  <div className='flex gap-2'>
                    <Textarea
                      className='w-full'
                      autosize
                      placeholder="Leave a comment (optional)"
                      onChange={(value) => form.setFieldValue('comment', value)}
                      {...form.getInputProps('comment')}
                    />
                    <Button loading={loading} disabled={!form.values.rating} type='submit' size='sm' className='bg-secondary border-0 hover:bg-green-700 w-32'>Submit</Button>
                  </div>
                </form>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}

      {!user && (
        <>
          <div className='flex gap-2 text-red-600'>
            You must be signed in to give a rating.
            <Link href='/login' className='text-secondary font-bold'>Continute to Log in</Link>
          </div>
        </>
      )}
    </>
  )
}