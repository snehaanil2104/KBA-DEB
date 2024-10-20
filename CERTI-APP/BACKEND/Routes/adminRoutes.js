import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminRoute=Router();
const user=new Map();
const secretKey='hi'

adminRoute.get('/',(req,res)=>{
    res.send("Hello World")
})


adminRoute.post('/signup', async(req,res)=>{
    try{
    const data = req.body;

    const{ FirstName,LastName,UserName,Password, Role}=data;
    if(user.has(UserName)){
        res.status(409).json({message:"already exist"})
    }else{
        const newP = await bcrypt.hash(Password,10)
    // console.log(newP);
    user.set(UserName,{  FirstName,LastName,Password:newP,Role})
    console.log(user.get(UserName));
    res.status(201).json({message:"data saved"})
    } }
    catch(error){
        res.status(500).json(error)
    }
})
adminRoute.post('/login',async(req,res)=>{
    const {UserName,Password}=req.body;
    console.log(UserName);
    const result=user.get(UserName)
    console.log(result);

    if(!result){
        res.status(404).json({message:"user not found"})
    }else{
        const valid=await bcrypt.compare(Password,result.Password);
        console.log(valid);
        if(valid){
            const token = jwt.sign({UserName:UserName,Role:result.Role},secretKey,{expiresIn:'1h'});
            res.cookie('authToken',token,{
                httpOnly:true,

            });
            res.status(200).json({token});
        }
    }
})
export {adminRoute};