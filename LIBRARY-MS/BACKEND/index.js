import express,{json} from 'express';
import bcrypt from 'bcrypt';
const app=express();

app.use(json())
const port=3000;
const user=new Map();

app.post('/signup', async(req,res)=>{
    const data = req.body;
    // console.log(data.FirstName);

    const{ FirstName,LastName,UserName,Password, Role}=data;
    // console.log(FirstName);
    if(user.has(UserName)){
        res.status(409).json({message:"already exist"})
    }else{
        const newP = await bcrypt.hash(Password,10)
    console.log(newP);
    user.set(UserName,{  FirstName,LastName,Password:newP,Role})
    console.log(user.get(UserName));
    res.status(201).json({message:"data saved"})
    } 
})

app.listen(port,()=>{                                   
    console.log(`Server is listening to port ${port}`)
})