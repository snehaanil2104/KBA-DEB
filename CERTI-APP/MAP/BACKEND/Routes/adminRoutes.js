import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../Middleware/auth.js";
import dotenv, { config } from 'dotenv';



dotenv.config();

const adminRoute=Router();
const user=new Map();
const certificate=new Map();
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
    // console.log(UserName);
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

adminRoute.post('/issuecerti', authenticate, (req, res) => {
    try {
        if (req.Role == 'admin') {

            const data=req.body;
            const {CourseName,CertiId,CandidateName,Grade,IssueDate}=data;

            if (certificate.has(CertiId)) {
                console.log("Already found an id !")
            } else {
                certificate.set(CertiId, {CourseName,CandidateName,Grade,IssueDate});
                res.status(201).json({ message: "successfully added" });
                console.log(certificate)
            }

        } else {
            res.status(403).json({ message: "user not allowed" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "server down!" })
    }

})




adminRoute.get('/search/:id', (req, res) => {
    try {
        const CertiId = req.params.id;

        if (certificate.has(CertiId)) {
            const certificateDetails = certificate.get(CertiId);
            res.status(200).json({ 
                message: "Certificate found.",
                data: certificateDetails 
            });
            console.log("Certificate details:");
            console.log(certificateDetails);
        } else {
            res.status(404).json({ message: "Certificate with this ID is not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


adminRoute.get('/viewcertificate', (req, res) => {
    try {
        const CertiId = req.query.id; // Get the certificate ID from query parameters

        if (!CertiId) {
            return res.status(400).json({ message: "Certificate ID is required" });
        }

        if (certificate.has(CertiId)) {
            const certificateDetails = certificate.get(CertiId);
            res.status(200).json({message: "Certificate found",data: certificateDetails 
            });
            console.log(`This is to certify that ${certificateDetails.CandidateName} has successfully completed ${certificateDetails.CourseName} with ${certificateDetails.Grade} on ${certificateDetails.IssueDate}`);
        
        } else {
            res.status(404).json({ message: "Certificate with this ID is not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

adminRoute.get('/viewuser',authenticate,(req,res)=>{
    try{
    const user=req.Role;
    // console.log(user);
    res.json({user});
    }
    catch{
        res.status(404).json({message:'user not authorized'});
    }
})

  //logout
  adminRoute.post('/logout',(req,res)=>{
    res.clearCookie('authToken');
    res.send('logout successfully');
    console.log('logout successfully');
})

export {adminRoute};


//     adminRoute.post('/issuecerti',authenticate, (req,res)=>{
//         try{
//             const data=req.body;
//                 const {CourseName,CertiId,CandidateName,Grade,IssueDate}=data;
       
//                 if(req.Role=='admin'){
//                 console.log("admin logged successfully")
    
//                 if(course.has(CertiId)){
//                     res.status(400).json({message:"certificate issued!!"})
//                     console.log("certificate already issued!!")
                    
//                 }else{
//                     course.set(CertiId,{CourseName,CandidateName,Grade,IssueDate})
//                     console.log(course.get(CertiId))
//                     console.log('certificate issueing..!');
//                     console.log(`This is to certify that ${CandidateName} has successfully completed ${CourseName} with ${Grade} on ${IssueDate}`);
//                     res.send("certificate  issued successfully!!")
//                 }
       
//     }else{
//         console.log('invalid');
//     }
// }
// catch(error){
//     res.status(500).json(error)
// }
//     });
  