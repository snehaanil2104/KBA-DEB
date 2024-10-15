import express from 'express';

const app=express();           //here app is the instance that created.
const port=8000;

app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`)
})