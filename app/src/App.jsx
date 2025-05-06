import React from 'react'
import HeroSection from './components/HeroSection'
import SmoothScroll from './SmoothScroll'
import About from './components/About'
import Services from './components/Services'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'


const App = () => {
  return (
    <>
      <SmoothScroll>
        <Toaster 
          position="bottom-right" 
          reverseOrder={false} 
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
              fontFamily: '"Poppins", sans-serif',
            },
          }}
        />
        <Navbar />
        <HeroSection />
        <About />
        <Services />
        <Footer />
      </SmoothScroll>
    </>
  )
}

export default App