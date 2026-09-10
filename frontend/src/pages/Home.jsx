import React from 'react'
import Advertisement from '../components/Advertisement'
import LatestCollection from '../components/LatestCollection'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'
import NewsLatterBox from '../components/NewsLatterBox'
import FeedBack from '../components/FeedBack'
import { ThemeProvider } from '../ThemeContext/Theme'




const Home = () => {
  return (
    <div>
      <ThemeProvider>
        
        <Advertisement />
        <LatestCollection />
        <BestSellers />
        <OurPolicy />
        <NewsLatterBox />
        <FeedBack />
        
      </ThemeProvider>

    </div>
  )
}

export default Home