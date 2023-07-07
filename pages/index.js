import React from 'react'
import Layout from '@/components/layouts/Layout'
import { HeroSection } from '@/components/HeroSection'
import { Container } from '@/components/layouts/Container'
import { NewlyAdded } from '@/components/NewlyAdded'

export default function Home() {
  return (
    <Layout>
      <HeroSection heading={' Find your favourite tv shows and rate their show. Explore now.'} />
      <Container>
        <div className='w-full justify-between gap-8 my-20'>
          <NewlyAdded />
        </div>
      </Container>
    </Layout>
  )
}