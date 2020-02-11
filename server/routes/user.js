const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/google', UserController.googleSign)

module.exports = router
