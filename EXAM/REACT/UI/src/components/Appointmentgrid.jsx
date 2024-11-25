import React from 'react';
import AppointmentCard from '../components/Appointmentcard';
import { useEffect, useState } from 'react';

const AppointmentGrid= ({isHome}) => {
  const [appointment,setAppointments] = useState([]);

  const appointmentList = isHome ? appointment.slice(0,3) : appointment;

  useEffect(()=>{
    const fetchAppointments = async () => {
      try{
        const res = await fetch('/api/viewappointments');
        const data = await res.json();
        
        setAppointments(data);
      } catch(error){
        console.log('Error fetching appointments:',error);
      }
    };
    fetchAppointments();
  },[]);

  return (
    <>
   
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10'>
        {appointmentList.map((appointment)=>(
            <AppointmentCard key={appointment.tokenid}appointment={appointment} />
        ))}
    </div>
    </>
  );
};

export default AppointmentGrid;