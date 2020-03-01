const userController = require('../controllers/userController')
const user = require('express').Router()

user.post('/register',userController.register)
user.post('/login',userController.login)
user.post('/googlelogin',userController.googleLogin)
user.post('/facebooklogin',userController.facebookLogin)



module.exports = user