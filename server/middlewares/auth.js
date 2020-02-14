"use strict"

const { User, Task } = require('../models')
const jwt = require('../helper/jwt')

function autheticate(req, res, next) {
    try {
        const token = jwt.checkToken(req.headers.access_token)
        User.findByPk(token.id)
            .then(user => {
                if (!user) {
                    next({ message: 'user not found' })
                } else {
                    req.userId = token.id
                    req.userEmail = token.email
                    next()
                }
            })
    }
    catch (err) {
        next(err)
    }
}

function authorize(req, res, next) {
    try {
        Task.findByPk(req.params.id)
            .then(task => {
                console.log(task.UserId, req.userId)
                if (!task) {
                    next({ message: 'you are not authorize' })
                } else {
                    if (task.UserId === req.userId) {
                        next()
                    } else {
                        next({ message: 'you are not authorize' })
                    }
                }
            })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    autheticate,
    authorize
}