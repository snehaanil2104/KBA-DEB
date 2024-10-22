import express,{json} from 'express';
import { adminRoute } from './Routes/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app=express();

app.use(json());
app.use('/',adminRoute)

const port=process.env.Port;


app.listen(port,()=>{                                   
    console.log(`Server is listening to port ${port}`)

})