const router = require('express').Router()
const user = require('./user')
const task = require('./task')
const project = require('./project')
const authentication = require('../middlewares/authentication')

router.use('/', user)

router.use(authentication)

router.use('/projects', project)

router.use('/tasks', task)

module.exports = router