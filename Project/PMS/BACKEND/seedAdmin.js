const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path to your User model

// Function to seed an admin user
const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/PAYROLL_MSA')
        

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@123.com' });
        if (existingAdmin) {
            console.log('Admin user already exists:', existingAdmin.email);
            mongoose.connection.close();
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Create the admin user
        const admin = new User({
            name: 'Admin User',
            email: 'admin@123.com',
            password: hashedPassword,
            role: 'admin',
        });

        // Save admin to database
        await admin.save();
        console.log('Admin user created successfully:', admin.email);

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding admin user:', error);
        mongoose.connection.close();
    }
};

// Run the seed function
seedAdmin();
