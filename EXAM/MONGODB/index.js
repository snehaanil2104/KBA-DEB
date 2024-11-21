import { adminroute } from './ROUTES/adminRoute.js';
import express, { json } from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

dotenv.config()

const app = express();

mongoose.connect("mongodb://localhost:27017/Appointmentschedulingsystem"
)

app.use(json());
app.use(cookieParser());
app.use('/',adminroute)

const port =process.env.port

app.listen(port,()=>{
    console.log(`Server running in port ${port}`)
})