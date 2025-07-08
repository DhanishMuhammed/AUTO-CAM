// controllers/authController.js
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    console.log("inside register function");
    const { Username, email, password, role = 'user' } = req.body // Add role field
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("user already exist..please login")
        } else {
            const newUser = new users({
                Username, email, password, role // Include role in user creation
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login request:", email, password);

    try {
        const existingUser = await users.findOne({ email });
        console.log("Found user in DB:", existingUser);

        if (existingUser && existingUser.password === password) {
            // Include role in JWT token
            const token = jwt.sign(
                { 
                    userId: existingUser._id, 
                    role: existingUser.role,
                    email: existingUser.email 
                }, 
                process.env.jwt_secret,
                { expiresIn: '24h' }
            );
            
            return res.status(200).json({ 
                user: existingUser, 
                token,
                role: existingUser.role // Send role back to frontend
            });
        } else {
            return res.status(406).json("Invalid email or password");
        }
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json("Server error");
    }
};