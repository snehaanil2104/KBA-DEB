import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authenticate } from "../Middleware/auth.js";

const adminRoute=Router();
const user=new Map();
const book=new Map();

const secretKey=process.env.SecretKey;

adminRoute.get('/',(req,res)=>{
    res.send("Hello World")
})


// adminRoute.post('/signupuser', async(req,res)=>{
//     try{
//     const data = req.body;

//     const{ Name,UserName,Email,Password, Role}=data;
//     if(user.has(UserName)){
//         res.status(409).json({message:"already exist"})
//     }else{
//         const newP = await bcrypt.hash(Password,10)
//     // console.log(newP);
//     user.set(UserName,{ Name,Email,Password:newP,Role})
//     console.log(user.get(UserName));
//     res.status(201).json({message:"data saved"})
//     } }
//     catch(error){
//         res.status(500).json(error)
//     }
// })

adminRoute.post('/signupuser', async (req, res) => {
    try {
        const data = req.body;
        console.log("Request Body:", data);

        const { Name, UserName, Email, Password, Role } = data;

        // Validate input fields
        if (!Name || !UserName || !Email || !Password || !Role) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Debugging: Check existing users
        // console.log("Existing Users:", Array.from(user.keys()));

        // Check if user already exists
        if (user.has(UserName)) {
            console.log(`Conflict: User with username ${UserName} already exists.`);
            return res.status(409).json({ message: "User already exists." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Save user data
        user.set(UserName, { Name, Email, Password: hashedPassword, Role });
        console.log("New User Saved:", user.get(UserName));

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});


// adminRoute.post('/login',async(req,res)=>{
//     const {UserName,Password}=req.body;
//     console.log(UserName);
//     const result=user.get(UserName)
//     console.log(result);

//     if(!result){
//         res.status(404).json({message:"user not found"})
//     }else{
//         const valid=await bcrypt.compare(Password,result.Password);
//         console.log(valid);
//         if(valid){
//             const token = jwt.sign({UserName:UserName,Role:result.Role},secretKey,{expiresIn:'1h'});
//             res.cookie('authToken',token,{
//                 httpOnly:true,

//             });
//             res.status(200).json({token});
//         }
//     }
// })



adminRoute.post('/login', async (req, res) => {
    try {
        const { UserName, Password } = req.body;

        // Validate input
        if (!UserName || !Password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        // Retrieve user from in-memory storage
        console.log("Login attempt for:", UserName);
        const result = user.get(UserName);
        console.log("Retrieved user:", result);

        if (!result) {
            // User not found
            return res.status(404).json({ message: "User not found." });
        }

        // Validate password
        const valid = await bcrypt.compare(Password, result.Password);
        console.log("Password valid:", valid);

        if (!valid) {
            // Invalid password
            return res.status(401).json({ message: "Invalid username or password." });
        }

        // Generate JWT
        const token = jwt.sign(
            { UserName, Role: result.Role }, secretKey, // Use env variable if available
            { expiresIn: '1h' }
        );

        // Set JWT in an HTTP-only cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            
        });

        // Send token in response for frontend storage (optional)
        res.status(200).json({ token, message: "Login successful." });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});


// Add a Book
adminRoute.post('/addbook', (req, res) => {
    try {
        const { Title, Author, Genre, PublishedYear } = req.body;
        
        if (!Title || !Author || !Genre || !PublishedYear) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (book.has(Title)) {
            return res.status(409).json({ message: "Book already exists." });
        }

        book.set(Title, { Author, Genre, PublishedYear });
        return res.status(201).json({ message: "Book added successfully!" });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// View All Books
adminRoute.get('/viewbooks', (req, res) => {
    try {
        const allBooks = Array.from(book.entries()).map(([Title, details]) => ({
            Title,
            ...details,
        }));
        res.status(200).json(allBooks);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Remove a Book
adminRoute.delete('/removebook', (req, res) => {
    try {
        const { Title } = req.body;  // Get the Title of the book to be removed

        // Check if the book exists in the storage
        if (!book.has(Title)) {
            return res.status(404).json({ message: "Book not found." });
        }

        // Remove the book from the in-memory storage
        book.delete(Title);

        return res.status(200).json({ message: "Book removed successfully!" });
    } catch (error) {
        console.error("Error removing book:", error);
        res.status(500).json({ message: "Server error" });
    }
});


export {adminRoute};