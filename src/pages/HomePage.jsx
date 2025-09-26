import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HomePageComponents/HeroSection'
import WhatWeOffer from '../components/HomePageComponents/WhatWeOffer'
import GalleryPreview from '../components/HomePageComponents/GalleryPreview'
import AboutUsPriview from '../components/HomePageComponents/AboutUsPriview'
import Footer from '../components/Footer'
import { showNotificationBanner } from '../components/showNotificationBanner'

function HomePage() {

  useEffect(() => {
    showNotificationBanner(); 
  }, []);

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

export default HomePage;