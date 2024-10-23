import express,{json} from 'express';
import { adminRoute } from './Routes/adminRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app=express();

app.use(cors({
    origin:'*'                       //origin:'http://127.0.0.1:8000'
    
}));
app.use(json());
app.use('/',adminRoute)

const port=process.env.Port;


app.listen(port,()=>{                                   
    console.log(`Server is listening to port ${port}`)

})