const router = require('express').Router();
const User  = require('../controllers/userController');

router.post('/register',User.register)
router.post('/login',User.login)
router.post('/google',User.google)

module.exports = router