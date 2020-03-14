var express = require('express')
var router = express.Router()
const todo = require('../controllers/todoController')

router.get('/', todo.findAll)
router.post('/', todo.create)
router.patch('/:id/status', todo.updateStatus)
router.patch('/:id', todo.update)
router.get('/:id', todo.findOne)
router.delete('/:id', todo.delete)

module.exports = router
