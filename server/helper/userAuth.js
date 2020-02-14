const { User } = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserAuth {

    static comparePassword(password, response_password) {
        return bcrypt.compareSync(password, response_password)
    }

    static signToken(objectUser) {
        return jwt.sign(objectUser, process.env.SECRET_KEY)
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.SECRET_KEY)
    }

}

module.exports = UserAuth