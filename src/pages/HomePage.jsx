import React from 'react'
import Navbar from '../components/HomePageComponents/Navbar'
import HeroSection from '../components/HomePageComponents/HeroSection'
import WhatWeOffer from '../components/HomePageComponents/WhatWeOffer'
import GalleryPreview from '../components/HomePageComponents/GalleryPreview'
import AboutUsPriview from '../components/HomePageComponents/AboutUsPriview'
import Footer from '../components/HomePageComponents/Footer'

function HomePage() {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <WhatWeOffer/>
        <GalleryPreview/>
        <AboutUsPriview/>
        <Footer/>
    </div>
  )
}

export default HomePage