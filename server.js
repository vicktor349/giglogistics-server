const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const verifyToken = require('./util/verifyToken')
app.use(express.json())
app.use(cors())
connectDB()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/api/auth', require('./auth/route'))
app.use('./package.json', verifyToken, (req, res) => {
    res.send('<h1>Hello</h1>')
})





const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})