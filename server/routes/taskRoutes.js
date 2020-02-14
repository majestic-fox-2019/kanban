const router = require('express').Router()
const taskController = require('../controllers/taskControllers')
const authorization = require('../middlewares/authorization')

router.get('/:project_id', taskController.readTask)
router.post('/:project_id', taskController.createTask)

router.get('/:task_id', authorization, taskController.readTaskById)
router.put('/:task_id', authorization, taskController.updateTaskById)
router.patch('/:task_id', authorization, taskController.updateStatus)
router.delete('/:task_id', authorization, taskController.deleteTaskById)
router.patch('/back/:task_id', authorization, taskController.backStatus)

module.exports = router