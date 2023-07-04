import React from 'react'
import { Modal, Group, Menu, Button, Textarea, Rating, Text, Alert } from '@mantine/core';
import { IconAlertCircle, IconStarHalfFilled } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { getTokenFromCookies } from '@/utils/cookies.utils';
import { ACCESS_TOKEN } from '@/utils/constants';
import { verifyToken } from '@/utils/jwt.utils';
import Link from 'next/link';
import axios from 'axios';
axios

export const RateTSQ = ({ item, open, close, opened }) => {
  const token = getTokenFromCookies(ACCESS_TOKEN)
  const [user, setuser] = React.useState({})
  const [titlesequence, settitlesequence] = React.useState(null)

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

  const form = useForm({
    initialValues: {
      rating: 0,
      comment: '',
    },
    validate: {
      rating: (value) => value ? null : 'Invalid email',
    },
  });

  React.useEffect(() => {
    axios.get(`/api/v1/themes/${item.id}`).then(response => {
      settitlesequence(response.data)
    }).catch(err => console.log(err))
    return () => {
      settitlesequence(null)
    }
  }, [item])


  return (
    <div>
      <Modal opened={opened} onClose={close} title={`Watch and Rate ${item.original_name || item.original_title}'s Title Sequence`} size={'xl'}>
        {titlesequence?.theme_url ? (
          <iframe className='aspect-video bg-secondary border border-primary w-full h-full rounded-md' src={`https://www.youtube.com/embed/${titlesequence?.theme_url}?rel=0`} title="Silo — Opening Title Sequence | Apple TV+" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        ) : (
          <div>Title sequence for this show not found</div>
        )}

        {user ? (
          <form onSubmit={form.onSubmit((values) => console.log(values))} className='flex flex-col gap-4'>
            <Text className='text-lg pt-10 pb-5'>What's your rating?</Text>
            <Group className='items-center'>
              <Rating
                {...form.getInputProps('rating')}
                onChange={(value) => form.setFieldValue('rating', value)} fractions={4} defaultValue={form.values.rating} color='#6FDA86' size='md' />
              <Text className='bg-primary rounded-sm text-xs px-2 py-1'>{form.values.rating} / 5</Text>
            </Group>
            <Textarea
              placeholder="Your comment"
              onChange={(value) => form.setFieldValue('comment', value)}
              label="Your comment"
              {...form.getInputProps('comment')}
            />
            <Button type='submit' size='lg' className='bg-secondary'>Submit</Button>
          </form>
        ) : (
          <>
            <div className='flex p-3 gap-2 text-red-600 bg-red-100 mt-5 rounded'>
              <IconAlertCircle size="1rem" />
              You must be signed in to give a rating.
              <Link href='/login' className='text-secondary font-bold'>Continute to Log in</Link>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}