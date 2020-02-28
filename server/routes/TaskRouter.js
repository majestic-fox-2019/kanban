const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')
const middleware = require('../middlewares/middleware')

router.get('/tasks', middleware.verifyToken, TaskController.getTaskList)
router.post('/task', middleware.verifyToken, TaskController.addTask)
router.get('/task/:id', middleware.verifyToken, middleware.authorUser, TaskController.detailTask)
router.put('/task/:id', middleware.verifyToken, middleware.authorUser, TaskController.updateTask)
router.delete('/task/:id', middleware.verifyToken, middleware.authorUser, TaskController.deleteTask)

module.exports = router