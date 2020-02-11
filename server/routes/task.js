const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const Authenticate = require('../middlewares/authentication')
const { taskAuthorization } = require('../middlewares/authorization')

router.get('/:projectId', Authenticate, TaskController.getAllProjectTasks)
router.post(
  '/:projectId',
  Authenticate,
  taskAuthorization,
  TaskController.createTask
)
router.delete(
  '/:id/:projectId',
  Authenticate,
  taskAuthorization,
  TaskController.deleteTask
)
router.patch(
  '/:id/:projectId',
  Authenticate,
  taskAuthorization,
  TaskController.patchStatus
)
router.put('/:id/:projectId', Authenticate, taskAuthorization, TaskController.editTask)

module.exports = router
