import express,{json} from 'express';
import { adminRoute } from './Routes/adminRoute.js';
import {userRoute} from './Routes/userRoute.js'

import dotenv from 'dotenv';
// import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();

const app=express();

// app.use(cors({
//     origin:'http://127.0.0.1:5501' ,
//     credentials:true                                        //origin:'http://127.0.0.1:8000'
    
// }));
app.use(json());
app.use(cookieParser());
app.use('/',adminRoute)
app.use('/',userRoute)


const port=process.env.Port;


app.listen(port,()=>{                                   
    console.log(`Server is listening to port ${port}`)

})