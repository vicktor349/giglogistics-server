const User = require('../models/userModel')
const bcrypt = require('bcrypt')

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
        }).then(user =>
            res.status(200).json({
                message: "User successfully created",
                user,
            })
        )
    } catch (err) {
        res.status(401).json({
            message: "User not successful created",
            error: error.mesage,
        })
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) res.status(400).json({ msg: "Invalid email or Password" })
    const dbPassword = user.password
    await bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            return res.status(400).json({ msg: "Invalid email or Password" })
        } else {
            return res.status(200).json({ msg: "Logged In Successfully!" })
        }
    })
}