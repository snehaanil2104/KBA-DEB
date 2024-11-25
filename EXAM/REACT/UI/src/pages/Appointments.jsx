import React from 'react'
import AppointmentGrid from '../components/Appointmentgrid'
import Navbar from '../components/Navbar'
const Appointments = () => {
  return (
    <>
    <Navbar />
    <AppointmentGrid isHome={false}/>
    </>
  )
}

export default Appointments