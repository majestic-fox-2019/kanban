'use strict'

const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authentication, authorizeTask } = require('../middlewares/auth')

router.use(authentication)
router.post('/', TaskController.create)
router.get('/', TaskController.readAll)

router.get('/:id', authorizeTask, TaskController.readOne)
router.put('/:id', authorizeTask, TaskController.update)
router.delete('/:id', authorizeTask, TaskController.delete)
router.patch('/:id', authorizeTask, TaskController.updateOne)

module.exports = router