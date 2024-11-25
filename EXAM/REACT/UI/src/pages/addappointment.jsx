import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const AddAppointment = () => {
  const [tokenid,setTokenid]=useState('');
  const [patientname,setPatientname]=useState('');
  const [doctorname,setDoctorname]=useState('');
  const [appointmentdate,setAppointmentdate]=useState('');
  const [appointmenttime,setappointmenttime]=useState('');

  const navigate = useNavigate();
  
  const Appointment =async (e)=>{
    e.preventDefault();

    const newAppointment = {
      tokenid,
      patientname,
      doctorname,
      appointmentdate,
      appointmenttime,
    }
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAppointment),
          });
          if(res.ok){
            navigate('/home');
          }else{
            console.log('Failed to add error');
          }
        }catch(error){
          console.log('Error adding appointment');
        }
  };
  
  return (
 
    <section className="bg-white mb-20">
    <div className="container m-auto max-w-2xl py-2">
      <div className="bg-purple-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        
        <form onSubmit={Appointment}>
          <h2 className="text-3xl text-purple-800 text-center font-semibold mb-6">
            Add Appointment
          </h2>

          <div className="mb-4">
            <label className="text-gray-700 font-bold mb-2">
              tokenid
            </label>
            <input
              type="text"
              id="tokenid"
              name="tokenid"
              className="border border-black rounded w-full py-2 px-3 mb-2"
              placeholder=""
              required
              value={tokenid}
              onChange={(e)=>setTokenid(e.target.value)}
              
            />
          </div>

          <div className="mb-4">
            <label className="  text-gray-700 font-bold mb-2">
              patient Name
            </label>
            <input
              type="text"
              id="patientname"
              name="patientname"
              className="border border-black  rounded w-full py-2 px-3 mb-2"
              placeholder="eg. 1"
              required
              value={patientname}
              onChange={(e)=>setPatientname(e.target.value)}
              
            />
          </div>

          <div className="mb-4">
            <label
              // htmlFor="type"
              className="  text-gray-700 font-bold mb-2"
            >
             doctor name
            </label>
           <input
            type="text"
              id="doctorname"
              name="doctorname"
              className="border border-black  rounded w-full py-2 px-3"
              required
              value={doctorname}
              onChange={(e)=>setDoctorname(e.target.value)}
            
            />
             
          </div>

          <div className="mb-4">
            <label
              // htmlFor="appointmentDate"
              className="  text-gray-700 font-bold mb-2"
            >
              appointmentDate
            </label>
            <input
            type='text'
              id="appointmentdate"
              name="appointmentdate"
              className="border border-black  rounded w-full py-2 px-3"
              // rows="4"
              placeholder=""
              value={appointmentdate}
              onChange={(e)=>setAppointmentdate(e.target.value)}
            ></input>
          </div>

          <div className="mb-4">
            <label
              // htmlFor="type"
              className="  text-gray-700 font-bold mb-2"
            >
             appointment time
            </label>
            <input
              type='text'
              id="appointmenttime"
              name="appointmenttime"
              className="border border-black  rounded w-full py-2 px-3"
              required
              value={appointmenttime}
              onChange={(e)=>setappointmenttime(e.target.value)}
              
            >
              
            </input>
          </div>

          <div>
            <button
              className="bg-purple-500 hover:bg-purple-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  )
}

export default AddAppointment