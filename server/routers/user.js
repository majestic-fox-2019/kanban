const router = require('express').Router()
const controller = require('../controllers/userController')

router.post('/gSignIn', controller.googleSign)

router.post('/register', controller.register)

router.post('/login', controller.login)

module.exports = router