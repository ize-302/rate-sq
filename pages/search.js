import React from 'react'
import Layout from '@/components/layouts/Layout'
import { HeroSection } from '@/components/HeroSection'
import { Container } from '@/components/layouts/Container'
import { useRouter } from 'next/router'
import { Text } from '@mantine/core'
import { ShowsList } from '@/components/shared/ShowsList'
import { ShowContext } from '@/context/showContext'

export default function Search() {
  const router = useRouter()
  const { query } = router.query
  const { handleSearch, loading, searchresults, setsearchresults, setloading } = React.useContext(ShowContext)

  React.useEffect(() => {
    setloading(true)
    handleSearch(query)
    return () => {
      setsearchresults([])
    }
  }, [query]) // eslint-disable-line

  return (
    <Layout>
      <HeroSection height='h-32' />
      <Container>
        <div className='w-full my-10 grid gap-10'>
          <div>
            <Text className='pb-1 text-2xl mb-5'>Search result for &apos;<b>{query}</b>&apos;</Text>
            <ShowsList loading={loading} shows={searchresults} />
          </div>
        </div>
      </Container>
    </Layout>
  )
}