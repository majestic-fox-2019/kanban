'use strict'

const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authentication, authorizeTodo } = require('../middlewares/auth')

router.use(authentication)
router.post('/', TodoController.create)
router.get('/', TodoController.readAll)

router.get('/:id', authorizeTodo, TodoController.readOne)
router.put('/:id', authorizeTodo, TodoController.update)
router.delete('/:id', authorizeTodo, TodoController.delete)
router.patch('/:id', authorizeTodo, TodoController.updateOne)

module.exports = router