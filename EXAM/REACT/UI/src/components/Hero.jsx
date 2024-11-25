import React from 'react'
import Navbar from './Navbar'

const Hero = () => {

      return (
<>
<Navbar/>
<div className='bg-purple-100 text-purple-900 p-8 rounded-lg shadow-md flex flex-col items-center justify-center mt-5 text-center'>
  <h1 className='font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
    Appointment Scheduling System for Hospitals
  </h1>
  <h2 className='mt-3 text-lg sm:text-xl md:text-2xl text-purple-700'>
    Since 2017
  </h2>
</div>

</>
      )
    }

export default Hero