const task = require('express').Router()
const authentication = require('../middlewares/authentication')
const taskController = require('../controllers/taskController')
const authorization = require('../middlewares/authorization')

task.get('/',authentication,taskController.list)
task.post('/',authentication,taskController.createTask)
task.delete('/:id',authorization,taskController.deleteTask)
task.put('/:id',authorization,taskController.updateTask)
task.patch('/:id',authorization,taskController.updateCategory)


module.exports = task