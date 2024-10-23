import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../Middleware/auth.js";
import dotenv, { config } from 'dotenv';

dotenv.config();

const adminRoute=Router();
const user=new Map();
const course=new Map();
const secretKey=process.env.SecretKey;

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
    adminRoute.post('/issuecerti',authenticate, (req,res)=>{
   
        if(req.Role=='admin'){
            console.log('admin logged successfully')
            try{
                const data=req.body;
                const {CourseName,CourseId,CandidateName,Grade,IssueDate}=data;
               
                if(course.has(CourseId)){
                    res.status(400).json({message:"certificate issued!!"})
                    console.log("certificate already issued!!")
                    
                }else{
                    course.set(CourseId,{CourseName,CandidateName,Grade,IssueDate})
                    console.log(course.get(CourseId))
                    console.log('certificate issueing..!');
                    console.log(`This is to certify that ${CandidateName} has successfully completed ${CourseName} with ${Grade} on ${IssueDate}`);
                    res.send("certificate  issued successfully!!")
                }
        }
        catch(error){
            res.status(500).json(error)
        }
    }else{
        console.log('invalid');
    }
    });
    //logout
    adminRoute.post('/logout',(req,res)=>{
    res.clearCookie('authToken');
    res.send('logout successfully');
    console.log('logout successfully');
})

export {adminRoute};