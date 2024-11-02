import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../Middleware/auth.js";
import dotenv from 'dotenv';
import mongoose from 'mongoose'

dotenv.config();

const adminRoute=Router();
const secretKey=process.env.SecretKey;
//define user schema
const userSchema=new mongoose.Schema(
    {
        firstName:String,
        lastName:String,
        userName:{type:String,unique:true},
        password:String,
        role:String
    }
)
//create model
const User=mongoose.model('Userdetails',userSchema)
const CourseSchema=new mongoose.Schema({
    courseName:String,
    courseId:{type:String,unique:true},
    courseType:String,
    description:String,
    price:String
})

//create course model
const Course=mongoose.model('courses',CourseSchema);

mongoose.connect('mongodb://localhost:27017/KBA')


adminRoute.get('/',(req,res)=>{
    res.send("Hello World")
})

adminRoute.post('/signup', async(req,res)=>{
    
    const data=req.body
    const{ FirstName,LastName,UserName,Password, Role}=data;
    // console.log(FirstName)
    const newP = await bcrypt.hash(Password,10)
    // console.log(newP);
    const existingUser=await User.findOne({userName:UserName})
    if(existingUser){
        res.status(400).json({message:"user already exist"})
        console.log("user already exist")
    }else{
        //create new user
        const newUser = new User({
            firstName:FirstName,
            lastName:LastName,
            userName:UserName,
            password:newP,
            role:Role
        });
        //save user to mongodb
        await newUser.save();
        res.status(201).json({message:"user registered successfully"});
        console.log("user registered successfully");
        
    }

})
adminRoute.post('/login',async(req,res)=>{
    try{
    const {UserName,Password}=req.body;
    // console.log(UserName);
    const result=await User.findOne({userName:UserName})
    console.log(result);

    if(!result){
        res.status(404).json({message:"user not found"})
    }else{
        console.log(Password);
        console.log(result.password)

        const valid=await bcrypt.compare(Password,result.password)
        // console.log(valid);
        if(valid){
           const token= jwt.sign({userName:UserName,Role:result.role},secretKey,{expiresIn:'1h'});
           res.cookie('authToken',token,{
            httpOnly:true,

           });
        //    console.log(token);
           
           res.status(200).json({token});
           console.log("logged in successfully")
            
        }
        
    }
}
catch(error){
    res.status(500).json(error)
}
    
})

adminRoute.post('/addcourse',authenticate,async (req,res)=>{
    const user=req.Role;
    const {CourseName,CourseId,CourseType,Description,Price}=req.body;

    try{
        if(user=="admin"){
            try{
                const existingCourse=await  Course.findOne({courseId:CourseId})
                if(existingCourse){
                    res.status(400).json({message:"Course already exist"})
                }
                else{
                    //create new course
                    const newCourse = new Course({
                        courseName:CourseName,
                        courseId:CourseId,
                        courseType:CourseType,
                        description:Description,
                        price:parseInt(Price)
                    });
                    //save to mongodb
                    await newCourse.save();
                    res.status(200).json({message:"Course added successfully",course:newCourse})
                    console.log(newCourse);
                }
            }
            catch(error){
                res.status(400).json({message:"check the course details"});
            }
        }
        else{
            res.status(400).json({message:"you don't have permission to add course"})
        }
    }
    catch(error){
        res.status(401).json({message:"check course details"});
    }
})

adminRoute.get('/getcourse',async(req,res)=>{
    try{
        const courseDetails =req.query.CourseId;
        console.log(courseDetails);
        const result=await Course.findOne({courseId:courseDetails}) 
        if(result){
            res.status(200).json(result)
           
        }  else{
            res.status(404).json({message:"Course not found"})
    }
}
catch(error){
    res.status(400).json({message:"check the input"})
}
})

//update using patch
adminRoute.patch('/updatecourse', authenticate, async(req, res) => {
    const user=req.Role;
    const data = req.body;
            const { newCourseName, CourseId, newCourseType, newDescription, newPrice } = data;
    try{
           if (user=== 'admin') {
            const result=await Course.updateOne(
                {courseId:CourseId},
                {
                    $set:{
                        courseName:newCourseName,
                        courseType:newCourseType,
                        description:newDescription,
                        price:parseInt(newPrice)
                    }
                }
            );
            
            if(result.matchedCount===0){
                return res.status(400).json({ message: "No such course" });
            }
            res.status(201).json({ message: "Course Details Updated" });
        } else {
            res.status(400).json({ message: "Unauthorized Access" });
        }
    } catch (error) {
        // Error handling for any unexpected issues
        res.status(400).json({ message: "Check the Course Details" });
    }
});


adminRoute.put('/updatecourse', authenticate, async (req, res) => {
  
        
        try {
            
            const { CourseName, CourseId, CourseType, Description, Price } = req.body;
            const existingCourse = await Course.findOne({ courseId:CourseId });
            if (!existingCourse) {
                return res.status(400).json({message:"course id is not exist"})
            }
            if (req.Role === 'admin') {
                console.log('Admin logged in successfully');
          
            existingCourse.courseName=CourseName || existingCourse.courseName,
            existingCourse.courseType=CourseType || existingCourse.courseType,
            existingCourse.description=Description || existingCourse.description,
            existingCourse.price=Price || existingCourse.price
                // Update only the fields provided in the request
            await existingCourse.save();
            res.status(201).json({ message: "Course Details Updated" });
            }else{
                res.status(400).json({ message: "Unauthorized Access" });
            }  
            } catch (error) {
                res.status(500).json({message:"internal server error"})
               
}
});



//detele course

adminRoute.delete('/deletecourse',authenticate,(req,res)=>{
    const Role=req.Role;
    console.log(Role);
    const results=req.query.CourseId;
    console.log(results);
    
    if(Role!=='admin'){
      res.send('you dont have permission');
    }
    else{
        if(course.has(results))
            {
                
                course.delete(results);
                console.log('course deleted successfully ')
                // res.send('veiw course details in console');
                res.send(`Course "${results}" has been deleted successfully.`);
            }
        else{
            res.send('course not found !')
        }
    }
})

adminRoute.get('/viewuser',authenticate,(req,res)=>{
    try{
        const user=req.Role;
        res.json({user});}
    catch{
        res.status(404).json({message:"user not authorized"});
    }
})

adminRoute.get('/viewcourse',(req,res)=>{                        //homepagile viewall
    try{
        console.log(course.size);
        if(course.size!=0){
            // res.status(200).json({message:'successfull'})
            res.send(Array.from(course.entries()))
        }
        else{
            res.status(404).json({message:'Not Found'});
        }
        
    }
    catch{
        res.status(500).json({message:"internal server error"})

    }
})

//logout
adminRoute.post('/logout',(req,res)=>{
    res.clearCookie('authToken');
    res.send('logout successfully');
    console.log('logout successfully');
})

export {adminRoute};