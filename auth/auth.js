const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const createToken = require('../util/createToken')


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
            return res.status(200).json({
                message: "User successfully created",
                token: accessToken
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
            return res.status(200).json({ msg: "Logged In Successfully!", token: accessToken })
        } else {
            return res.status(400).json({ msg: "Invalid email or Password" })
        }
    })
}


// GET USERS
exports.getUsers = async (req, res, next) => {
    await User.find({})
        .then(users => {
            const userFunction = users.map(user => {
                const container = {}
                container.email = user.email
                return container
            })
            res.status(200).json({ user: userFunction })
            console.log(userFunction)
        })
        .catch(err =>
            res.status(401).json({ message: "Not successful", error: err.message })
        )
}
