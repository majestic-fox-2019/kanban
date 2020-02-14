const express = require('express')
const router = express.Router()
const user = require('../controllers/user')

router.post('/register',user.register)
router.post('/login',user.login)
router.post('/otherlogin',user.otherLogin)

module.exports = router