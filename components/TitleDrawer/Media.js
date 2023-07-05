import { TitleContext } from '@/context/titleContext';
import { ACCESS_TOKEN } from '@/utils/constants';
import { getTokenFromCookies } from '@/utils/cookies.utils';
import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'

export const Media = ({ item }) => {
  const token = getTokenFromCookies(ACCESS_TOKEN)
  const [loading, setloading] = React.useState(false)
  const { fetchTitle, handleSearch } = React.useContext(TitleContext)
  const router = useRouter()
  const { query } = router.query

  const form = useForm({
    initialValues: {
      embed_code: '',
    },
    validate: {
      embed_code: (value) => value ? null : 'Add embed code',
    },
  });

  const handlesubmission = (values) => {
    setloading(true)
    axios.post(`/api/v1/titles`, {
      embed_code: values.embed_code,
      id: item?.id,
      name: item?.name,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      setloading(false)
      fetchTitle(item.id)
      handleSearch(query)
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
    <div>
      {item?.exists && (
        <iframe className='aspect-video  w-full h-full rounded-md' src={`https://www.youtube.com/embed/${item?.embed_code}?rel=0`} title={item?.name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      )}
      {!item?.exists && (
        <div>
          <form className='grid gap-2' onSubmit={form.onSubmit((values) => handlesubmission(values))} >
            <TextInput
              error={form.errors.embed_code}
              {...form.getInputProps('embed_code')}
              label='Video ID (from youtube)' placeholder='video id here' />
            <Button loading={loading} type='submit' className='bg-secondary border-0 w-24 mt-1'>Add</Button>
            <div className='mt-2'>
              Preview:
              {form.values.embed_code && (
                <iframe className='aspect-video mt-2 w-full h-full rounded-md' src={`https://www.youtube.com/embed/${form.values.embed_code}?rel=0`} title={name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  )
}