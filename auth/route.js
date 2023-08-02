const express = require('express')
const router = express.Router()

// REGISTER ROUTE
const { signup, signin, getUsers } = require('./auth')
router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/getUsers').get(getUsers)

module.exports = router
