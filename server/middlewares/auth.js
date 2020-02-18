'use strict'

const { verifyToken } = require('./jwt')
const { User, Todo, Task } = require('../models')

function authentication(req, res, next) {
    try {
        req.userLoggedIn = verifyToken(req.headers.token)
        User.findByPk(req.userLoggedIn.id)
        .then(user => {
            if(user) {
                next()
            } else {
                next({ status: 403, message: 'Invalid access' })
            }
        })
        .catch(next)
    }
    catch {
        next({ status: 401, message: 'User must login first' })
    }
}

function authorizeTodo(req, res, next) {
    const UserId = req.userLoggedIn.id
    const id = req.params.id

    Todo.findByPk(id)
    .then(todo => {
        if(todo) {
            if(todo.UserId === UserId) {
                next()
            } else {
                next({ status: 403, message: 'User unauthorize' })
            }
        } else {
            next({ status: 404, message: 'Data not found' })
        }
    })
    .catch(next)
}

function authorizeTask(req, res, next) {
    const UserId = req.userLoggedIn.id
    const id = req.params.id

    Task.findByPk(id)
    .then(task => {
        if(task) {
            if(task.UserId === UserId) {
                next()
            } else {
                next({ status: 403, message: 'User unauthorize' })
            }
        } else {
            next({ status: 404, message: 'Data not found' })
        }
    })
    .catch(next)
}

module.exports = {
    authentication,
    authorizeTodo,
    authorizeTask
}