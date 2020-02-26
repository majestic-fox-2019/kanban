const express = require('express')
const router = express.Router()
const taskController = require('../Controller/taskController')
const authorization = require('../middleware/authorization')

router.get('/',taskController.list)
router.post('/',taskController.create)
router.put('/:id',authorization,taskController.update)
router.delete('/:id',authorization,taskController.delete)

module.exports = router
