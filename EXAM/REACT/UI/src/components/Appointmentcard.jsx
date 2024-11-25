import React from 'react';

const AppointmentCard = ({appointment}) => {
  return (
    <div className="bg-purple-200 shadow-md rounded-md border p-4 m-2">
      <h3 className="text-lg font-bold text-purple-700 mb-2">Token ID: {appointment.tokenid}</h3>
      <p className="text-gray-700"><strong>Patient Name:</strong> {appointment.patientName}</p>
      <p className="text-gray-700"><strong>Doctor Name:</strong> {appointment.doctorName}</p>
      <p className="text-gray-700"><strong>Appointment Date:</strong> {appointment.appointmentDate}</p>
      <p className="text-gray-700"><strong>Appointment Time:</strong> {appointment.appointmentTime}</p>
    </div>
  );
};

export default AppointmentCard;
