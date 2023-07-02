import React from 'react'
import { Container } from './layouts/Container'
import { Text, Button } from '@mantine/core'
import { useRouter } from 'next/router'
import { useForm } from '@mantine/form'

export const HeroSection = ({ showHeadings, height }) => {
  const router = useRouter()

  const form = useForm({
    initialValues: {
      query: router.query.query || '',
    },

    validate: {
      query: (value) => value ? null : 'Enter a search query',
    },
  });

  return (
    <div className={`${height} bg-secondary`}>
      <Container maxW='max-w-4xl'>
        <div className='flex flex-col justify-center h-full'>
          {showHeadings && (
            <Text className='text-white text-2xl mb-4 md:mb-1 text-center'>
              Find your favourite tv shows <br />and rate their title. Explore now.</Text>
          )}
          <form className='flex flex-col md:flex-row items-center  pl-5 mt-2 gap-3 md:gap-0' onSubmit={form.onSubmit((values) => router.push({
            pathname: '/search',
            query: {
              query: values.query
            }
          }))}>
            <input
              placeholder="Search for movie or tv show"
              className='w-full h-[50px] border-0 outline-none rounded-full md:rounded-l-full md:rounded-r-none px-3'
              {...form.getInputProps('query')}
            />
            <Button type='submit' style={{ height: '50px' }} className='block w-[200px]  bg-primary border-0 rounded-full md:rounded-l-none md:rounded-r-full'>Search</Button>
          </form>
          <Text size='xs' color='gray' className='text-center mt-5'>Powered by <a target="_blank" href="https://themoviedb.org">themoviedb.org</a></Text>
        </div>
      </Container>
    </div>
  )
}