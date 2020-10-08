"use strict"

const bcrypt = require("bcrypt")
const saltRounds = 8
const jwt = require("jsonwebtoken")

function hash (password) {
    return bcrypt.hashSync(password, saltRounds)
 
}

function comparePass (password, hash) {
    return bcrypt.compare(password, hash)
    .then(result => {
        return result
    })
    .catch(err => {
        throw err
    })
}

function sign (id) {
    const token = jwt.sign({idUser: id}, process.env.JWT_KEY)
    return token
}

async function verify (token) {
    try {
        const result = await jwt.verify(token, process.env.JWT_KEY)
        return result
    }
    catch(err){
        throw {code: 403, message: "forbidden"}
    }
}

module.exports = {
    hash,
    comparePass,
    sign,
    verify
}