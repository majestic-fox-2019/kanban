const express   = require('express')
const router    = express.Router()

const TasksController = require('../controllers/TasksController');

// router.get('/:projectId', TasksController.listPerProject);
router.post('/', TasksController.add);
router.put('/:id', TasksController.update);
router.delete('/:id', TasksController.delete);
router.patch('/:id', TasksController.updateCategory);

module.exports = router