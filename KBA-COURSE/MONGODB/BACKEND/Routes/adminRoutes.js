import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../Middleware/auth.js";
import dotenv from 'dotenv';
import mongoose from 'mongoose'

 
dotenv.config();
const adminRoute=Router();
const secretKey=process.env.SecretKey
//define user schema(designing) for signin  and login
const userSchema=new mongoose.Schema({
        FirstName: String,
        LastName: String,
        UserName: { type: String, unique: true, required: true },
        Password: { type: String, required: true },
        Role:  String 
    });

const User =mongoose.model('User',userSchema)

 // create model for addcourse
 const courseSchema= new mongoose.Schema({
    CourseName: String,
    CourseId: { type: String, unique: true },
    CourseType: String,
    Description: String,
    Price: Number,
})
const Course =mongoose.model('courses',courseSchema)

mongoose.connect("mongodb://localhost:27017/KBA-Courses")

adminRoute.get('/',(req,res)=>{ //callbk func // eth index page venditt matgarm 
    res.send("Hello World") 
})

//signup

adminRoute.post('/signup', async (req, res) => {
    try {
        const { FirstName, LastName, UserName, Password, Role } = req.body;
        const existingUser = await User.findOne({ UserName });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new User({ FirstName, LastName, UserName, Password: hashedPassword, Role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error });
    }
});

//login

adminRoute.post('/login', async (req, res) => {
    try {
        const { UserName, Password } = req.body;
        console.log("Attempting login for:", UserName);

        // Find the user by UserName in MongoDB
        const result = await User.findOne({ UserName });
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the provided password matches
        const valid = await bcrypt.compare(Password, result.Password);
        if (valid) {
            const token = jwt.sign(
                { UserName: result.UserName, Role: result.Role },
                secretKey,
                { expiresIn: '1h' }
            );

            // Set token in a cookie
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
 

//addcourse

// const course=new Map() // map declaring ourside updte and add course can use the same map

adminRoute.post('/addcourse', authenticate, async (req, res) => {
    if (req.Role === 'admin') {
        try {
            const { CourseName, CourseId, CourseType, Description, Price } = req.body;
            const existingCourse = await Course.findOne({ CourseId });

            if (existingCourse) {
                return res.status(400).json({ message: "Course already exists" });
            }

            const newCourse = new Course({ CourseName, CourseId, CourseType, Description, Price });
            await newCourse.save();

            res.status(201).json({ message: "Course added successfully" });
        } catch (error) {
            res.status(500).json({ error });
        }
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
});

//UPDATE COURSE
adminRoute.patch('/updatecourse', authenticate, async (req, res) => {
    if (req.Role === 'admin') {
        try {
            const { CourseId, CourseName, CourseType, Description, Price } = req.body;

            // Find course and update fields if provided
            const updatedCourse = await Course.findOneAndUpdate(
                { CourseId },
                {
                    $set: {
                        CourseName: CourseName || undefined,
                        CourseType: CourseType || undefined,
                        Description: Description || undefined,
                        Price: Price || undefined
                    }
                },
                { new: true } // Return the updated document
            );

            if (updatedCourse) {
                res.status(200).json({ message: "Course updated successfully", updatedCourse });
            } else {
                res.status(404).json({ message: "Course not found" });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    } else {
        res.status(403).json({ message: "You do not have permission to update courses" });
    }
});

      

   //using params
   adminRoute.get('/getcourse/:name', authenticate, async (req, res) => {
    try {
        const course = await Course.findOne({ CourseName: req.params.name });
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

adminRoute.delete('/deletecourse', authenticate, async (req, res) => {
    if (req.Role === 'admin') {
        const { CourseId } = req.query;
        try {
            const deletedCourse = await Course.findOneAndDelete({ CourseId });
            if (deletedCourse) {
                res.status(200).json({ message: `Course "${CourseId}" deleted successfully` });
            } else {
                res.status(404).json({ message: "Course not found" });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    } else {
        res.status(403).json({ message: "Access denied" });
    }
});
   


adminRoute.get('/viewuser', authenticate, async (req, res) => {
    try {
        const user = await User.findOne({ UserName: req.UserName });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

adminRoute.get('/viewcourse', async (req, res) => {
    try {
        const courses = await Course.find();
        if (courses.length) {
            res.status(200).json(courses);
        } else {
            res.status(404).json({ message: "No courses found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

adminRoute.get('/logout', authenticate, (req, res) => {
    try {
        res.clearCookie('authToken');
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error });
    }
});

export {adminRoute} ;