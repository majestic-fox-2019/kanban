const TaskRouter = require('express').Router()
const TaskController = require('../controllers/task')
const {TaskAuthorize} = require('../middlewares/authorization')

TaskRouter.post('/:categoryId', TaskController.add)
TaskRouter.put('/:id', TaskAuthorize, TaskController.update)
TaskRouter.delete('/:id', TaskAuthorize ,TaskController.delete)

module.exports = TaskRouter