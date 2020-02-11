const UserRouter = require('express').Router()
const UserController = require('../controllers/user')

UserRouter.put('/', UserController.update)

module.exports = UserRouter