import express,{json} from 'express';
import { adminRoute } from './Routes/adminRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();

const app=express();

app.use(cors({
    origin:'http://127.0.0.1:5501' ,
    credentials:true                                        //origin:'http://127.0.0.1:8000'
    
}));
app.use(cookieParser());
app.use(json());
app.use('/',adminRoute);

const port=process.env.Port;

app.listen(port,()=>{                                   
    console.log(`Server is listening to port ${port}`)
})
    