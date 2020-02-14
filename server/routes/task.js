const express = require('express')
const router = express.Router()
const task = require('../controllers/task')

router.post('/',task.create)
router.get('/',task.findAll)
router.delete('/:id',task.delete)
router.patch('/:id',task.patch)

module.exports = router