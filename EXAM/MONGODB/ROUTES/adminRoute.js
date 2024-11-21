import { Router } from "express"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import mongoose from "mongoose";
dotenv.config();
const adminroute = Router()

const appointmentSchema = new mongoose.Schema({
  tokenID: { type: String,unique: true },
  patientName: { type: String },
  doctorName: { type: String},
  appointmentDate: { type: Date },
  appointmentTime: { type: String },
});

const appointment= mongoose.model('Appointment', appointmentSchema);


adminroute.post('/appointment',async (req,res) => {
    try {
        const { tokenID, patientName, doctorName, appointmentDate, appointmentTime } = req.body;
        const newAppointment = new appointment({
            tokenID: tokenID,
            patientName: patientName,
            doctorName: doctorName,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime
        });
        console.log(newAppointment);

        await newAppointment.save

        res.status(201).json({ message: 'Appointment created', appointment: newAppointment });
    } catch (err) {
    res.status(500).json({ message:'internal server error' });
    }
    });

    adminroute.get('/appointment', async (req,res) => {
        try {
          const { doctorName } = req.query;
          const appointments = await appointment.find({ doctorName
            });
            res.json(appointments);
            } catch (error) {
                res.status(400).json({ message: error.message
                    });
                    }
                    });

    adminroute.put('/:tokenID', async (req, res) => {
        try {
          const { tokenID } = req.params;
          const updatedData = req.body;
          const updatedAppointment = await appointment.findOneAndUpdate(
            { tokenID },
            updatedData,
            { new: true }
          );
          if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
          res.json({ message: 'Appointment updated', appointment: updatedAppointment });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });
    adminroute.delete('/:tokenID', async (req, res) => {
        try {
            const { tokenID } = req.params;
            const deletedAppointment = await appointment.findOneAndDelete({ tokenID });
            if (!deletedAppointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            res.json({ message: 'Appointment deleted' });
            } catch (err) {
                res.status(500).json({ error: err.message
                    });
                    }
                    });


                    export {adminroute}