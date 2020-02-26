const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const verifyGoogle = require('../middleware/verifyGoogle')

router.post('/register',userController.Register)
router.post('/login',userController.Login)
router.post('/googleLogin',verifyGoogle,userController.googleLogin)

module.exports = router