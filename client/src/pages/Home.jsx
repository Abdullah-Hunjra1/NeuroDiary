import React from 'react'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Testimonials  from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Features  from '../components/Features'

const Home = () => {
  return (
    <div>
      
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </div>
  )
}

export default Home