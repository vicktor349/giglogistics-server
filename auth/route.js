const express = require('express')
const router = express.Router()

// REGISTER ROUTE
const { signup, signin } = require('./auth')
router.route('/signup').post(signup)
router.route('/signin').post(signin)

module.exports = router
