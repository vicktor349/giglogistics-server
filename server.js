const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const verifyToken = require('./util/verifyToken')
app.use(express.json())
app.use(cors())
connectDB()

app.use(verifyToken, (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://giglogistics.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/api/auth', require('./auth/route'))





const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})