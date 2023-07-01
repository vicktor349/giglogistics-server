const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./config/db')
connectDB()
app.use(express.json())


app.use('/api/auth', require('./auth/route'))





const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})