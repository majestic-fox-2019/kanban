const router = require('express').Router()
const member = require('./member')
const projectTask = require('./projectTasks')
const controller = require('../controllers/projectController')
const authorization = require('../middlewares/authorization')

router.use('/members', member)

router.use('/tasks', projectTask)

router.get('/', controller.findAllProjects)

router.post('/', controller.create)

router.get('/:id', controller.findProjectTasks)

router.delete('/:id', authorization.deleteProject, controller.deleteProject)


module.exports = router