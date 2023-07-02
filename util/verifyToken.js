const jwt = require('jsonwebtoken')
require('dotenv').config()


const verifyToken = (req, res, next) => {
    const accessToken = req.cookies['access-token']
    if (!accessToken) {
        return res.status(401).json({
            msg: "Not Authenticated!"
        })
    }
    try {
        const validToken = jwt.verify(accessToken, process.env.JWT_SECRET)
        if (validToken) {
            req.authenticated = true
            return next()
        }
    } catch (err) {
        res.status(400).json({
            err: err
        })
    }

}


module.exports = verifyToken