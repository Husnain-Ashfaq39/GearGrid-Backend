const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        console.log("Request coming");
        const { name, email, password, confirmPassword } = req.body;
        console.log("Registration req", name);

       
        if (!name || !email || !password || !confirmPassword) {
            console.error("Validation error: All fields are required");
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            console.error("Validation error: Passwords must match");
            return res.status(400).json({ message: 'Passwords must match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error("User already exists: ", email);
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            name, 
            email,
            role: 'customer', // Default role set to 'customer'
            password: hashedPassword 
        });
        
        await newUser.save();
        console.log("User registered successfully:", name);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Server error during registration:", error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        console.log("Login request in controller");
        const { email, password } = req.body;

        if (!email || !password) {
            console.error("Validation error: Email and password are required");
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            console.error("User not found: ", email);
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error("Invalid credentials for user: ", email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const { session, userId } = { session: jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET), userId: user._id };
        console.log(session);
        res.status(200).json({ session, userId });
    } catch (error) {
        console.error("Server error during login:", error);
        res.status(500).json({ error: 'Server error during login' });
    }
};

exports.logout = (req, res) => {
    res.status(200).json({ message: 'User logged out successfully' });
};



