import React from 'react'
import Layout from '@/components/layouts/Layout'
import { HeroSection } from '@/components/HeroSection'
import { Container } from '@/components/layouts/Container'
import { LatestRatings } from '@/components/LatestRatings'
import { Trending } from '@/components/Trending'
import { MostRated } from '@/components/MostRated'

export default function Home() {
  return (
    <Layout>
      <HeroSection showHeadings={true} height='h-96' />
      <Container>
        <div className='w-full justify-between gap-8 my-20'>
          <Trending />
        </div>
      </Container>
    </Layout>
  )
}