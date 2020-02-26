const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = function (req, res, next) {

    try {
        req.loggedUser = jwt.verify(req.headers.token, process.env.JWT_SECRET)

        return User.findOne({
            where: {
                id: req.loggedUser.id
            }
        })
            .then(userData => {   
                if (userData) {
                    next()
                } else {
                    next({
                        statusCode: 403,
                        message: 'Invalid token'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    catch (error) {
        next({
            statusCode: 403,
            message: 'Invalid token'
        })
    }
}