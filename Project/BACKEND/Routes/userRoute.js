import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../Middleware/auth.js";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import {Admin} from './adminRoute.js'
 

dotenv.config();
const userRoute=Router();
const secretKey=process.env.SecretKey;

const userDetails=new mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, unique: true },
    role:  String 
});
const UserD= mongoose.model('UserD',userDetails);




mongoose.connect("mongodb://localhost:27017/Payroll-Management")

userRoute.get('/',(req,res)=>{ //callbk func // eth index page venditt matgarm 
    res.send("Hello World") 
})

userRoute.post('/signupuser', async (req, res) => {
    try {
        const { name, email, password, role} = req.body;
        const existingUser = await UserD.findOne({ name });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        const newUser = new UserD({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error });
    }
});

userRoute.post('/loginuser', async (req, res) => {
    try {
        const { name, password } = req.body;

        // Find the user by name
        const result = await UserD.findOne({ name });
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        // Log the values for debugging
        console.log("Request password:", password);
        console.log("Stored hashed password:", result.password);

        // Check if either password is undefined
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        if (!result.password) {
            return res.status(500).json({ message: "User password is missing in the database" });
        }

        // Compare passwords
        const valid = await bcrypt.compare(password, result.password);
        if (valid) {
            const token = jwt.sign(
                { name: result.name, role: result.role },
                secretKey,
                { expiresIn: '1h' }
            );

            res.cookie('authToken', token, { httpOnly: true });
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
});
// Route to get user profile details
userRoute.get('/profile', authenticate, async (req, res) => {
    try {
        const pname=req.query.name;
         const existing=await  UserD.findOne({name:pname});

        if (!existing) {
            return res.status(404).json({ message: "User not found" });
        }else{
            console.log(existing);
            return res.status(200).json(existing);
        }
       
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
});

userRoute.put('/profile', authenticate, async (req, res) => {
    try {
        const pname = req.query.name; // Get user name from query
        const { email, phone, address } = req.body; // Updated fields from request body

        // Find and update the user's profile details
        const updatedUser = await UserD.findOneAndUpdate(
            { name: pname },
            { email},
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        } else {
            console.log(updatedUser);
            return res.status(200).json(updatedUser);
        }

    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
});



const payslipSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserD' },
    month: String,
    grossSalary: Number,
    taxDeductions: Number,
    netPay: Number
});

// Create the model only if it hasn't been defined
const Payslip = mongoose.models.Payslip || mongoose.model('Payslip', payslipSchema);

// Route to get payslip by user name and month
userRoute.get('/payslip', authenticate, async (req, res) => {
    try {
        const { name, month } = req.query;

        // Find the user by name
        const user = await UserD.findOne({ name });
        console.log("User found:", user); // Log the user information

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the payslip based on userId and month
        const payslip = await Payslip.findOne({ userId: user._id, month });
        console.log("Payslip found:", payslip); // Log the payslip information

        if (!payslip) {
            return res.status(404).json({ message: "Payslip not found" });
        } else {
            return res.status(200).json(payslip);
        }

    } catch (error) {
        console.error("Error fetching payslip:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
});



export{userRoute}