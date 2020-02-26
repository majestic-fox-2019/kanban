const controllerTask = require('../controllers/tasks')
const router = require('express').Router()
const authoris = require('../middleware/authoris')


router.get('/', controllerTask.taskAll)
router.post('/', controllerTask.createTask)
router.get('/:id', authoris, controllerTask.findTask)
router.patch('/:id', authoris, controllerTask.updateOne)
router.put('/:id', authoris, controllerTask.updateAll)
router.delete('/:id', authoris, controllerTask.deleteTask)

module.exports = router