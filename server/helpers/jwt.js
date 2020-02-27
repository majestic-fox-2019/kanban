const jwt = require('jsonwebtoken')

function generateToken(payload){
    return jwt.sign(payload, process.env.PASSWORD_TOKEN)
}

function verify(payload){
    return jwt.verify(payload, process.env.PASSWORD_TOKEN)
}

module.exports = { generateToken, verify }