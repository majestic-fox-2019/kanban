const router = require('express').Router()
const controller = require('../controllers/taskController')

router.get('/:projectId', controller.findProjectTasks)

module.exports = router