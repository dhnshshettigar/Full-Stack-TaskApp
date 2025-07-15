const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/authMiddleware')

const User = require('../models/User')

// POST /api/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    // basic validation 
    
    if (!username || !password) {
        return res.status(400).json({ message: "All field are required" })
    }

    try {

        // check if user already exists
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" })
        }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Save user
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()

        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({ message: "Server Message :",error: error.messaage })
    }
})


// Post /api/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: "All field are required" })
    }

    try {
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1hr' })

        res.json({ message: "Login successful", token })
    } catch (error) {
        return res.status(500).json({ message: "Server Message :", error: error.messaage })
    }
})


// GET /api/profile (protected)
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password')
        if (!user)
            return res.status(404).json({ message: "User not found" })

        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router