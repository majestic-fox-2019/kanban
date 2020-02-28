var express = require('express')
var router = express.Router()
let UserController = require('../controllers/UserController')

router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.get('/users',UserController.users)

module.exports = router
