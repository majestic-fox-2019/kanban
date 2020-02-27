const router = require('express').Router()
const userController = require('../controllers/userControllers')

router.post('/login', userController.loginHandler)
router.post('/register', userController.registerHandler)
router.post('/google/login', userController.googleSignIn)

module.exports = router