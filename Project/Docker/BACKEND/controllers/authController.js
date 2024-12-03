// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Assuming you have a User model

// // Login route to authenticate admin and return a JWT token
// const login = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user || !user.comparePassword(password)) { // Assuming you have a password comparison method
//         return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id, role: user.role }, 'your_secret_key', {
//         expiresIn: '1h', // Token expires in 1 hour
//     });

//     // Send token and role in response
//     res.json({ token, role: user.role });
// };

// module.exports = login;
