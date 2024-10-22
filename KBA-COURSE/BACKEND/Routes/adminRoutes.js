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
    console.log(data.FirstName);

    const{ FirstName,LastName,UserName,Password, Role}=data;
    console.log(FirstName);
    if(user.has(UserName)){
        res.status(400).json({message:"already exist"})
    }else{
        const newP = await bcrypt.hash(Password,10)
    console.log(newP);
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
                res.status(400).json({message:"Course Already Exist!!"})
                console.log("Course Already Exist!!")
                res.send("Course Already Exist!!")
            }else{
                course.set(CourseId,{CourseName,CourseType,Description,Price})
                console.log(course.get(CourseId))
                console.log('Course added successfully!');
                res.send('Course updated successfully!');
            }
    }
    catch(error){
        res.status(500).json(error)
    }
}else{
    console.log('invalid');
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
adminRoute.get('/getcourse', authenticate,(req,res)=>{
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
                        res.send('Course not found:');
                    }
                
                    }catch(error){
                        res.status(500).json(error)
                    }
    
})

// adminRoute.post('/updatecourse', authenticate,(req,res)=>{
//     if(req.Role=='admin'){
//         console.log('admin logged successfully')
//         try{
//             const data=req.body;
//             const {newCourseName,CourseId,newCourseType,newDescription,newPrice}=data;
//             // console.log(data);

//             if(course.has(CourseId)){
                
//                 course.set(CourseId,{newCourseName,newCourseType,newDescription,newPrice})
//                 console.log(course.get(CourseId))
//                 console.log('Course updated successfully!');
//                 res.send('Course updated successfully!');
                
//             }else{
//                 res.status(400).json({message:"Course Already Exist!!"})
//                 console.log("Course Already Exist!!")
//                 res.send("Course Already Exist!!")
//             }
//     }
//     catch(error){
//         res.status(500).json(error)
//     }
// }else{
//     console.log('invalid');
// }
// })

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

//delete course
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

//logout
adminRoute.post('/logout',(req,res)=>{
    res.clearCookie('authToken');
    res.send('logout successfully');
    console.log('logout successfully');
})

export {adminRoute};