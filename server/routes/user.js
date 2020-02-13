const controllerUser = require('../controllers/users')
const router = require('express').Router()
// const authoris = require('../middleware/authoris')

router.post('/register', controllerUser.register)
router.post('/login', controllerUser.login)
// router.post('/logout', controllerUser.logout)

module.exports = router