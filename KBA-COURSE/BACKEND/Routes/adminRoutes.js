import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../Middleware/auth.js";
import dotenv from 'dotenv';

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
    console.log("Hi");
    const data = req.body;
    // console.log(data.FirstName);

    const{ FirstName,LastName,UserName,Password, Role}=data;
    // console.log(FirstName);
    if(user.has(UserName)){
        res.status(400).json({message:"already exist"})
    }else{
        const newP = await bcrypt.hash(Password,10)
    // console.log(newP);
    user.set(UserName,{FirstName,LastName,Password:newP,Role});
    console.log(user.get(UserName));
    res.status(201).json({message:"data saved"})
    } }
    catch(error){
        res.status(500).json(error)
    }
})
adminRoute.post('/login',async(req,res)=>{
    try{
    const {UserName,Password}=req.body;
    console.log(UserName);
    const result=user.get(UserName)
    console.log(result);

    if(!result){
        res.status(404).json({message:"user not found"})
    }else{
        const valid=await bcrypt.compare(Password,result.Password)
        console.log(valid);
        if(valid){
           const token= jwt.sign({UserName:UserName,Role:result.Role},secretKey,{expiresIn:'1h'});
           res.cookie('authToken',token,{
            httpOnly:true,

           });
           console.log(token);
           
           res.status(200).json({token});
         
           
        }
        
    }
}
catch(error){
    res.status(500).json(error)
}
    
})
adminRoute.post('/addcourse',authenticate, (req,res)=>{
   
    if(req.Role=='admin'){
        console.log('admin logged successfully')
        try{
            const data=req.body;
            const {CourseName,CourseId,CourseType,Description,Price}=data;
            // console.log(data);

            if(course.has(CourseId)){
                // res.status(400).json({message:"Course Already Exist!!"})
                console.log("Course Already Exist!!")
                res.send("Course Already Exist!!")
            }else{
                course.set(CourseId,{CourseName,CourseType,Description,Price})
                console.log(course.get(CourseId))
                console.log('Course added successfully!');
                // res.status(201).json({ message: "Course Details Uploaded" });
                res.send('Course updated successfully!');
            }
    }
    catch(error){
        console.error("Error adding course:", error);
        return res.status(500).json(error)
    }
}else{
    console.log('invalid');
    return res.status(403).json({ message: 'Access denied' });
}
});

// adminRoute.post('/getcourse', authenticate,(req,res)=>{
//     if(req.Role=='admin'){
//         console.log('admin logged successfully');
//         try{
//             const {CourseId}= req.body;
//             if (course.has(CourseId)){
//                 const courseDetails=course.get(CourseId);
//                 console.log('Course details:',courseDetails);
//                 res.status(200).json({message:"course details retrieved"})
//             }else{
//                 console.log('Course not found:');
//                 res.status(200).json({message:"course not found"});
//             }
//             }catch(error){
//                 res.status(500).json(error)
//             }
//         }else{
//                 console.log('Invalid user Role');
//             }
//         })

//using params
adminRoute.get('/getcourse/:name',authenticate,(req,res)=>{
    console.log(req.params.name);
    try{
    if (course.has(req.params.name)){
                        const courseDetails=course.get(req.params.name);
                        console.log('Course details:',courseDetails);
                        res.status(200).json({message:"course details retrieved"})
                    }else{
                        console.log('Course not found:');
                        res.status(200).json({message:"course not found"});
                    }
                
                    }catch(error){
                        res.status(500).json(error)
                    }
                
                })
    
//using query
adminRoute.get('/getcourse',(req,res)=>{
  console.log(req.query.CourseId);
  try{
    if (course.has(req.query.CourseId)){
                        const courseDetails=course.get(req.query.CourseId);
                        console.log('Course details:',courseDetails);
                        // res.status(200).json({message:"course details retrieved"})
                        res.send(courseDetails);
                    }else{
                        console.log('Course not found:');
                        res.status(404).json({message:"course not found"});
                        // res.send('Course not found:');
                    }
                
                    }catch(error){
                        res.status(500).json(error)
                    }
    
})

adminRoute.post('/updatecourse', authenticate,(req,res)=>{
    if(req.Role=='admin'){
        console.log('admin logged successfully')
        try{
            const data=req.body;
            const {newCourseName,CourseId,newCourseType,newDescription,newPrice}=data;
            // console.log(data);

            if(course.has(CourseId)){
                
                course.set(CourseId,{newCourseName,newCourseType,newDescription,newPrice})
                console.log(course.get(CourseId))
                console.log('Course updated successfully!');
                res.send('Course updated successfully!');
                
            }else{
                res.status(400).json({message:"Course Already Exist!!"})
                console.log("Course Already Exist!!")
                res.send("Course Already Exist!!")
            }
    }
    catch(error){
        res.status(500).json(error)
    }
}else{
    console.log('invalid');
}
})

adminRoute.put('/updatecourse', authenticate,(req,res)=>{
    if(req.Role=='admin'){
        console.log('admin logged successfully')
        try{
            const data=req.body;
            const {newCourseName,CourseId,newCourseType,newDescription,newPrice}=data;
            // console.log(data);

            if(course.has(CourseId)){
                
                course.set(CourseId,{newCourseName,newCourseType,newDescription,newPrice})
                console.log(course.get(CourseId))
                console.log('Course updated successfully!');
                res.send('Course updated successfully!');
                
            }else{
                res.status(400).json({message:"Course Already Exist!!"})
                console.log("Course Already Exist!!")
                res.send("Course Already Exist!!")
            }
    }
    catch(error){
        res.status(500).json(error)
    }
}else{
    console.log('invalid');
}
})

//update using patch
adminRoute.patch('/updatecourse', authenticate, (req, res) => {
    if (req.Role === 'admin') {
        console.log('Admin logged in successfully');
        try {
            const data = req.body;
            const { CourseName, CourseId, CourseType, Description, Price } = data;

            // Check if the course exists using the CourseId
            if (course.has(CourseId)) {
                // Retrieve existing course details
                const existingCourse = course.get(CourseId);

                // Update only the fields provided in the request
                // course.set(CourseId, {
                    existingCourse.CourseName=CourseName || existingCourse.CourseName,
                    existingCourse.CourseType=CourseType || existingCourse.CourseType,
                    existingCourse.Description=Description || existingCourse.Description,
                    existingCourse.Price= Price || existingCourse.Price,
                // });

                console.log(course.get(CourseId));
                console.log('Course updated successfully!');
                res.send('Course updated successfully!');
                
            } else {
                res.status(404).json({ message: "Course does not exist!" });
                console.log("Course does not exist!");
            }
        } catch (error) {
            console.error('Error updating course:', error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    } else {
        console.log('Invalid role');
        res.status(403).json({ message: "You do not have permission!" });
    }
});



//detele course

// adminRoute.delete('/deletecourse', authenticate, (req, res) => {
//     const Role = req.Role;
//     console.log(Role);
//     const results = req.query.CourseId;
//     console.log(results);
    
//     if (Role !== 'admin') {
//         res.status(403).send('You do not have permission.');
//     } else {
//         if (course.has(results)) {
//             course.delete(results);
//             console.log('Course deleted successfully');
//             res.status(200).send(`Course "${results}" has been deleted successfully.`);
//         } else {
//             res.status(404).send('Course not found!');
//         }
//     }
// });

  // Assuming you're using Express and have set up `adminRoute` and `authenticate` middleware

adminRoute.delete('/deletecourse', authenticate, (req, res) => {
    const Role = req.Role;
    const courseId = req.query.CourseId; // Retrieve the CourseId from query parameters
  
    console.log("Received delete request for Course ID:", courseId);
    console.log("User Role:", Role);
  
    if (Role !== 'admin') {
      return res.status(403).send('You do not have permission to delete this course.');
    }
  
    if (!courseId) {
      return res.status(400).send('Course ID is required.');
    }
  
    // Assuming `course` is a Map or other data structure holding course information
    if (course.has(courseId)) {
      course.delete(courseId);
      console.log(`Course with ID ${courseId} deleted successfully`);
      return res.status(200).send(`Course "${courseId}" has been deleted successfully.`);
    } else {
      console.log(`Course with ID ${courseId} not found`);
      return res.status(404).send('Course not found.');
    }
  });
  

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

adminRoute.get('/logout', authenticate, (req, res) => {
    try {
        if (req.Role) {
            res.clearCookie('authToken');
            res.status(200).json({ message: "Logout successfull" });
        } else {
            res.status(404).json({ message: "No user found!" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" })
    }

})

export {adminRoute};