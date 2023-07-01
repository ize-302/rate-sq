import React from 'react'
import Layout from '@/components/layouts/Layout'
import { HeroSection } from '@/components/HeroSection'
import { Container } from '@/components/layouts/Container'
import { LatestRatings } from '@/components/LatestRatings'
import { Trending } from '@/components/Trending'
import { MostRated } from '@/components/MostRated'
import { useRouter } from 'next/router'
import axios from 'axios'
import Image from 'next/image'
import { Group, Rating, Text, Button } from '@mantine/core'
import { ThemeModal } from '@/components/ThemeModal'
import { ACCESS_TOKEN } from '@/utils/constants'
import { verifyToken } from '@/utils/jwt.utils'
import { getTokenFromCookies } from '@/utils/cookies.utils'
import { IconLink } from '@tabler/icons-react'

export default function Home() {
  const router = useRouter()
  const { id } = (router.query)
  const [data, setdata] = React.useState({})
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

  React.useEffect(() => {
    if (id) {
      axios.get(`/api/v1/tv/${id}`).then(response => {
        setdata(response.data)
      }).catch(error => {
        console.log(error)
      })
    }

    return () => {
      setdata({})
    }
  }, [router])

  return (
    <Layout>
      <div className='relative bg-no-repeat bg-cover' style={{ backgroundImage: 'url("https://image.tmdb.org/t/p/original/' + data?.backdrop_path + '")' }}>
        <div className='h-full w-full bg-gradient-to-r from-secondary absolute top-0 left-0 flex items-center' />
        <Container>
          <div className='flex flex-col-reverse md:flex-row gap-10 relative z-10 py-10 h-[800px]'>
            <div className='w-64'>
              <img className='rounded-lg' src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`} width='100%' height='100%' />
            </div>
            <div>
              <Text className='text-white text-3xl font-semibold'>{data.name}</Text>
              <div className='mt-4 gap-2'>
                <Rating value={4.5} size='xl' fractions={2} color='#6FDA86' readOnly />
                <Text className='text-xs text-white mt-2'>Avg. ratings: 4.5/5</Text>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="aspect-video bg-secondary relative -top-80 rounded-md left-0 border border-primary">
          <iframe className='w-full h-full rounded-md' src="https://www.youtube.com/embed/AJlOS6ZeIcA?rel=0" title="Silo — Opening Title Sequence | Apple TV+" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </Container>
    </Layout>
  )
}