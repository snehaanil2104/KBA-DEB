import express,{json} from 'express';
import { adminRoute } from './Routes/adminRoutes.js';

const app=express();

app.use(json());
app.use('/',adminRoute);

const port=4000;

app.listen(port,()=>{                                   
    console.log(`Server is listening to port ${port}`)
})
    