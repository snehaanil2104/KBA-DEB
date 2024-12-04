// const express = require('express');
// const bcrypt = require('bcrypt');
// const User = require('../models/User'); // Adjust the path to your User model
// const router = express.Router();

// router.post('/create-admin', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash('admin123', 10);

//         const admin = new User({
//             name: 'Admin User',
//             email: 'admin@example.com',
//             password: hashedPassword,
//             role: 'admin',
//         });

//         await admin.save();
//         res.status(201).json({ message: 'Admin created successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error creating admin', details: error });
//     }
// });

// module.exports = router;
