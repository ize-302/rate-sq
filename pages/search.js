import React from 'react'
import Layout from '@/components/layouts/Layout'
import { HeroSection } from '@/components/HeroSection'
import { Container } from '@/components/layouts/Container'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Text } from '@mantine/core'
import { TitlesList } from '@/components/shared/TitlesList'

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
    axios.get(`/api/v1/search?query=${query}`).then(response => {
      setsearchresults(response.data.items)
      setloading(false)
    }).catch(error => {
      setloading(false)
      console.log(error)
    })
  }


  return (
    <Layout>
      <HeroSection height='h-32' />
      <Container>
        <div className='w-full my-10 grid gap-10'>
          <div>
            <Text className='pb-1 text-2xl mb-5'>Search result for '<b>{query}</b>'</Text>
            <TitlesList loading={loading} titles={searchresults} />
          </div>
        </div>
      </Container>
    </Layout>
  )
}