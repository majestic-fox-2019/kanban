const userRoute = require('express').Router()

const userController = require('../controllers/userController')

userRoute.post('/login', userController.login)
userRoute.post('/register', userController.register)
userRoute.post('/googlelogin', userController.googleLogin)

module.exports = userRoute