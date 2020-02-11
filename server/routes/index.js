const router = require('express').Router()
const User = require('./user')
const Task = require('./task')
const Project = require('./project')

router.use('/users', User)
router.use('/tasks', Task)
router.use('/projects', Project)

module.exports = router