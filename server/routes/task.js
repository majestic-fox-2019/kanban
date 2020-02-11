const TaskRouter = require('express').Router()
const TaskController = require('../controllers/task')
const {TaskAuthorize} = require('../middlewares/authorization')

TaskRouter.get('/:projectId', TaskController.list)
TaskRouter.post('/:projectId', TaskController.add)
TaskRouter.put('/:projectId/:id', TaskAuthorize, TaskController.update)
TaskRouter.delete('/:projectId/:id', TaskAuthorize ,TaskController.delete)

module.exports = TaskRouter