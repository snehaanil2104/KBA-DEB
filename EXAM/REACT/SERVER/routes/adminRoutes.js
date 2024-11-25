import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const schedulesSchema=new mongoose.Schema({
    tokenid:{type:Number,unique:true},
    patientName:String,
    doctorName:String,
    appointmentDate:String,
    appointmentTime:String
});
const appointments=mongoose.model('Appointments',schedulesSchema)

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    userType: { type: String,required: true },
  
  });
  const User=mongoose.model('Userdetails',userSchema)

mongoose.connect('mongodb://localhost:27017/AppointmentSA')

const adminroute =Router();
adminroute.post("/register", async (req, res) => {
    try {
      const userDetails = req.body;
      const username = userDetails.userName;
      const password = userDetails.password;
      const email = userDetails.email;
      const userType = userDetails.userType
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword, email, userType });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  adminroute.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log(user, "user");
      if (!user) {
        return res
          .status(401)
          .json({ error: "Authentication failed- User doesn't exists" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: "Authentication failed- password doesn't match" });
      }
  
      const token = jwt.sign(
        { userId: user._id, userType: user.userType },
        "your-secret-key",
        {
          expiresIn: "1h",
        }
      );
  
      res.cookie("Authtoken", token);
      res.json({
        status: true,
        message: "login success",
        userType: user.userType
      });
      return res;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Login failed" });
    }
  });
  
adminroute.post('/appointments',async(req,res)=>{
    const details=req.body;
    const {tokenid, patientname,doctorname,appointmentdate,appointmenttime}=details;
    const existing= await appointments.findOne({tokenid:tokenid})
    if(existing){
        res.status(409).json({Message:'This token already exist !'})
    }
    else {
        const newAppt= new appointments({
            tokenid:tokenid,
            patientName:patientname,
            doctorName:doctorname,
            appointmentDate:appointmentdate,
            appointmentTime:appointmenttime
        })
        await newAppt.save();
        res.status(200).json({Message:'successfully appointmented'});
    }
})

adminroute.get('/doctor',async(req,res)=>{
    const doctorname=req.query.doctorname;
    const viewdoctor=await appointments.find({doctorName:doctorname});
    console.log(viewdoctor);
    if (!viewdoctor){
        res.status(201).json({Message:"no appointments yet !" })
    }
    else{
        res.status(200).json(viewdoctor)
    }
})

adminroute.get("/viewappointments", async (req, res) => {
  const details = await appointments.find({});
  res.send(details);
  // console.log(details)
});

 // Logout
 adminroute.get("/logout", (req, res) => {
    res.clearCookie("Authtoken");
    res.status(200).send("Logout successful");
    return res;
  });

export {adminroute};