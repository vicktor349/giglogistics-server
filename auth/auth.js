const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const createToken = require('../util/createToken')

// JWT LIFESPAN 
const maxAge = 24 * 60 * 60 * 1000

// SIGNUP LOGIC
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: "Email Already Exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }).then((user) => {
            const accessToken = createToken(user)
            res.cookie("jwtToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: maxAge
            })
            return res.status(200).json({
                message: "User successfully created",
                user: user._id,
            })
        }

        )
    } catch (err) {
        res.status(401).json({
            message: "User not successful created",
            error: error.mesage,
        })
    }
}


// SIGNIN LOGIC
exports.signin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) res.status(400).json({ msg: "Invalid email or Password" })
    const dbPassword = user.password
    await bcrypt.compare(password, dbPassword).then((match) => {
        if (match) {
            const accessToken = createToken(user)
            res.cookie("jwtToken", accessToken, {
                secure: true,
                httpOnly: true,
                maxAge: maxAge
            })
            return res.status(200).json({ msg: "Logged In Successfully!", user: user._id })
        } else {
            return res.status(400).json({ msg: "Invalid email or Password" })
        }
    })
}
