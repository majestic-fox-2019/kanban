const router = require('express').Router()

const Controller = require('../controllers/user')

router.post('/login', Controller.login)

router.post('/register', Controller.register)

router.post('/g-auth', Controller.gSignIn)

module.exports = router
