const route = require('express').Router()

const userRoute = require('./userRoute')
const taskRoute = require('./taskRoute')
const authentication = require('../middlewares/authentication')

route.use('/', userRoute)
route.use('/tasks', authentication, taskRoute)

module.exports = route