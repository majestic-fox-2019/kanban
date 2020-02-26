const express = require('express')
const router = express.Router()
const routetask =require('./task')
const routeUser = require('./user')
const authentication = require('../middleware/authentication')


router.use('/user',routeUser)
router.use(authentication)
router.use('/tasks',routetask)



module.exports = router