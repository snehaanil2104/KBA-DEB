import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../Middleware/auth.js";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

 
dotenv.config();
const adminRoute=Router();
const secretKey=process.env.SecretKey
//define user schema(designing) for signin  and login
const userSchema=new mongoose.Schema({
        name: String,
        email: String,
        password: { type: String, unique: true },
        role:  String 
    });

const User =mongoose.model('User',userSchema)

const employeeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    dateOfJoining: { type: Date, required: true },
    salary: { type: Number, required: true },
});
const Employee =mongoose.model('Employee',employeeSchema)

const payslipSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    grossSalary: { type: Number, required: true },
    deductions: { type: Number, required: true },
    bonuses: { type: Number, required: true },
    netPay: { type: Number, required: true },
    generatedAt: { type: Date, default: Date.now }
});

const Payslip = mongoose.model('Payslip', payslipSchema);

const taxComplianceSchema = new mongoose.Schema({
    taxSlabs: {
        slab1: { type: Number, required: true },
        slab2: { type: Number, required: true },
        slab3: { type: Number, required: true },
        slab4: { type: Number, required: true },
    },
    automaticTaxDeduction: { type: Boolean, default: false },
    taxDeadlineReminder: { type: Date, required: false }
});

const TaxCompliance = mongoose.model('TaxCompliance', taxComplianceSchema);


mongoose.connect("mongodb://localhost:27017/Payroll-Management")

adminRoute.get('/',(req,res)=>{ //callbk func // eth index page venditt matgarm 
    res.send("Hello World") 
})

//signup

adminRoute.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role} = req.body;
        const existingUser = await User.findOne({ name });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error });
    }
});

//login

adminRoute.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;

        // Find the user by name
        const result = await User.findOne({ name });
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



//add emplyoyee
adminRoute.post('/addemployee', async(req,res)=>{
    try {
        const { fullName, email, phoneNumber, address, department, position, dateOfJoining, salary } = req.body;

        // Create a new employee instance
        const newEmployee = new Employee({
            fullName,
            email,
            phoneNumber,
            address,
            department,
            position,
            dateOfJoining,
            salary,
        });

        // Save to the database
        await newEmployee.save();

        res.send({ message: 'Employee added successfully', employee: newEmployee });
    } catch (error) {
        res.send({ message: 'Error adding employee', error: error.message });
    }
});

adminRoute.put('/editemployee/:id',async (req,res)=>{
    try {
        const { id } = req.params; // Get the employee ID from the URL parameters
        const { fullName, position, department, salary, dateOfJoining } = req.body;

        // Update the employee details
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            fullName,
            position,
            department,
            salary,
            dateOfJoining,
        }, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        res.status(400).json({ message: 'Error updating employee', error: error.message });
    }
});

adminRoute.delete('/deleteemployee/:id',async(req,res)=>{
    try {
        const { id } = req.params; // Get the employee ID from the URL parameters

        // Find the employee by ID and remove them
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
});

adminRoute.post('/processPayroll',(req,res)=>{
    try {
        const { employeeIds, grossSalary, taxDeductions, bonusIncentives } = req.body;

        // Check if the required data is provided
        if (!employeeIds || !grossSalary || !taxDeductions || !bonusIncentives) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Calculate net pay
        const deductions = (taxDeductions / 100) * grossSalary;
        const netPay = grossSalary - deductions + bonusIncentives;

        // Here you can add logic to save this data to your database, if needed

        res.status(200).json({
            message: 'Payroll processed successfully',
            employeeIds,
            grossSalary,
            deductions,
            bonusIncentives,
            netPay,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing payroll', error: error.message });
    }
})

adminRoute.post('/generatePayslip',async(req,res)=>{
    try {
        const { employeeId, name, position, department, grossSalary, taxDeductions, bonuses } = req.body;

        // Check if the required data is provided
        if (!employeeId || !name || !position || !department || !grossSalary || !taxDeductions || !bonuses) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Calculate deductions and net pay
        const deductions = (taxDeductions / 100) * grossSalary;
        const netPay = grossSalary - deductions + bonuses;

        // Create payslip object
        const payslip = new Payslip({
            employeeId,
            name,
            position,
            department,
            grossSalary,
            deductions,
            bonuses,
            netPay
        });

        // Save payslip to the database
        await payslip.save();

        res.status(200).json({
            message: 'Payslip generated and saved successfully',
            payslip,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating payslip', error: error.message });
    }

});

adminRoute.post('/taxCompliance',async (req,res)=>{
    try {
        const { taxSlabs, automaticTaxDeduction, taxDeadlineReminder } = req.body;

        // Validate input
        if (!taxSlabs || !taxSlabs.slab1 || !taxSlabs.slab2 || !taxSlabs.slab3 || !taxSlabs.slab4) {
            return res.status(400).json({ message: 'All tax slab fields are required.' });
        }

        // Create and save tax compliance object
        const taxCompliance = new TaxCompliance({
            taxSlabs,
            automaticTaxDeduction,
            taxDeadlineReminder
        });

        await taxCompliance.save();
        res.status(200).json({
            message: 'Tax compliance settings saved successfully',
            taxCompliance
        });
    } catch (error) {
        res.status(500).json({ message: 'Error saving tax compliance settings', error: error.message });
    }
})



export{adminRoute}