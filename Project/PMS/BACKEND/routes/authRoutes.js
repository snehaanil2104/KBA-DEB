const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const app = express();
const cookieParser = require('cookie-parser');
 // Assuming you have a User model

app.use(cookieParser());
 

router.post('/signup',async(req,res)=>{
    try {
        const {userName, password, email, userType}=req.body
        const existingUser= await User.findOne({email:email})
        const hashedPassword = await bcrypt.hash(password, 10);

        if(existingUser){
                res.status(404).json({message:"User Already Exist"})
            }else{
                const newuser=new User({
                    name:userName,
                    email:email,
                    password:hashedPassword,
                    role:userType
                })
                await newuser.save()
                res.status(201).json({message:"User Created Successfully"})
            }        
    } catch (error) {
      console.error('Error in signup route:', error.message); // Log the error
        res.status(500).json({message:error.message})        
    }
})


router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log(email, password);
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
  
      const token = jwt.sign({ userType: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
      
      res.cookie('Authtoken', token, {
        httpOnly: true,  // Ensures that the cookie is not accessible via JavaScript
        secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
        sameSite: 'Strict',  // Helps prevent CSRF attacks
        maxAge: 3600000,  // 1 hour in milliseconds
      });
      res.json({ token, role: user.role });
      //  console.log('/login in the bakend res', res)
      return res;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  router.get('/alluser', async (req, res) => {
    try {
      const allusers = await User.find({ role: 'user' }); // Query to find users with role 'user'
      res.status(200).json(allusers); 
      console.log(allusers)// Send back all users as JSON
    } catch (error) {
      res.status(500).json({ 
        message: 'Error retrieving users', 
        error: error.message 
      });
    }
  });


// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("Authtoken");
  res.status(200).send("Logout successful");
  return res;
});


module.exports = router;
