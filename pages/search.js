import React from 'react'
import Layout from '@/components/layouts/Layout'
import { HeroSection } from '@/components/HeroSection'
import { Container } from '@/components/layouts/Container'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Avatar, Group, Skeleton, Text } from '@mantine/core'
import Link from 'next/link'
import LazyLoad from 'react-lazyload';

const SelectItem = ({ item }) => {
  return (
    <div className='cursor-pointer pb-4 pt-2 rounded border-b'>
      <Group noWrap>
        <LazyLoad>
          <Avatar size={'xl'} src={item?.poster_path ? `https://image.tmdb.org/t/p/original/${item?.poster_path}` : ''} />
        </LazyLoad>
        <div>
          <Link className='underline' href={`/${item.media_type}/${item.id}`} size="md">{item.original_name || item.original_title}</Link>
          <Text size="sm" opacity={0.65}>
            {item.overview}
          </Text>
        </div>
      </Group>
    </div>
  )
};

export default function Search() {
  const router = useRouter()
  const { query } = router.query
  const [searchresults, setsearchresults] = React.useState([])
  const [loading, setloading] = React.useState(false)


  React.useEffect(() => {
    handleSearch()
    return () => {
      setsearchresults([])
    }
  }, [query])

  const handleSearch = () => {
    setloading(true)
    axios.get(`/api/v1/search/film?query=${query}`).then(response => {
      setsearchresults(response.data.results.filter(result => ['tv'].includes(result.media_type)))
      setloading(false)
    }).catch(error => {
      setloading(false)
      console.log(error)
    })
  }

  return (
    <Layout>
      <HeroSection showHeadings={false} height='h-32' />
      <Container>
        <div className='w-full my-10'>
          <Text className='pb-1 text-2xl mb-5'>Search result for '<b>{query}</b>'</Text>
          <div className='flex flex-col gap-5'>
            {loading && (
              <>
                {[1, 2, 3, 4, 5].map(item => (
                  <div key={item} className='flex gap-3'>
                    <Skeleton className='w-24 h-24' size='xl' radius='md' />
                    <div className='flex flex-col gap-3 w-full'>
                      <Skeleton height={20} width={200} />
                      <Skeleton height={12} />
                      <Skeleton height={12} />
                      <Skeleton height={12} />
                    </div>
                  </div>
                ))}
              </>
            )}

            {(!loading && searchresults.length > 0) && searchresults.map((item, index) => (
              <SelectItem key={index} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  )
}