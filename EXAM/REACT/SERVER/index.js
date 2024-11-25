import express,{json} from "express"
import {adminroute} from './routes/adminRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
const app =express();

app.use(cors({
    origin:"http://localhost:8003"
}));

app.use(json());
app.use(cookieParser());


app.use('/',adminroute);
const port=8000;
app.listen(port,()=>{
    console.log(`server listen to the ${port}`)
})
