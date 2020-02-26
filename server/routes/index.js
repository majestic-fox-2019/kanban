const router = require('express').Router()
const user = require('./user')
const task = require('./task')
const authentic = require('../middleware/authentic')


router.use('/user', user)
router.use(authentic)
router.use('/task', task)

module.exports = router