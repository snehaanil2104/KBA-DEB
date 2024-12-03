const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db');
const authRoutes= require('./routes/authRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const taxComplianceRoute = require('./routes/taxComplianceRoute'); 

 // Assuming you already have user routes
const app = express();

dotenv.config();
connectDB();


// Middleware
app.use(
    cors({ 
      origin:"http://localhost:3000",
      credentials: true,
    })
  );
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/payroll', payrollRoutes);
app.use('/api/employees',employeeRoutes);
app.use('/api/taxCompliance', taxComplianceRoute);


const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});