import express,{json} from 'express';
import bcrypt from 'bcrypt';
const app=express();

app.use(json())
const port=8000;
const user=new Map();

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.post('/signup', async(req,res)=>{
    try{
    console.log("Hi");
    const data = req.body;
    console.log(data.FirstName);

    const{ FirstName,LastName,UserName,Password, Role}=data;
    console.log(FirstName);
    if(user.has(UserName)){
        res.status(400).json({message:"already exist"})
    }else{
        const newP = await bcrypt.hash(Password,10)
    console.log(newP);
    user.set(UserName,{  FirstName,LastName,Password:newP,Role})
    console.log(user.get(UserName));
    res.status(201).json({message:"data saved"})
    } }
    catch(error){
        res.status(500).json(error)
    }
})


app.listen(port,()=>{                                   
    console.log(`Server is listening to port ${port}`)

})