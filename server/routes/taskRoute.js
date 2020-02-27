const taskRoute = require('express').Router()

const TaskController = require('../controllers/taskController')
const authorization = require('../middlewares/authorization')

taskRoute.post('/', TaskController.createTask)
taskRoute.get('/', TaskController.showAll)
taskRoute.patch('/:id', authorization, TaskController.changeTaskCategory)
taskRoute.get('/:id', authorization ,TaskController.findById)
taskRoute.delete('/:id', authorization ,TaskController.deleteTask)


module.exports = taskRoute