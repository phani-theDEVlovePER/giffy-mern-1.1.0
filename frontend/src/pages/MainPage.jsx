import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HeroNext from '../components/HeroNext'
import InputOuputBundler from '../components/InputOuputBundler'
import Footer from '../components/Footer'

const MainPage = () => {
    return (
      <>
        <section className='pagebg h-full min-w-full flex flex-col gap-[1rem] sm:gap-[4rem]'>
  
          {/* navbar */}
          <Navbar />
  
          {/* hero */}
          <Hero />
          <HeroNext />
  
          {/* input */} {/* output */}
          <InputOuputBundler />
        </section>
        <Footer />
      </>
    )
}

export default MainPage