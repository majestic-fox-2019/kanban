const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const taskController = require('../controllers/taskController')

router.use(auth.autheticate)
router.get('/', taskController.findAll)
router.post('/', taskController.create)
router.patch('/:id/assign', taskController.takeAssign)

router.use('/:id', auth.authorize)
router.patch('/:id/decline', taskController.declineAssign)
router.get('/:id', taskController.findByPk)
router.delete('/:id', taskController.delete)
router.patch('/:id', taskController.updateCategory)
router.put('/:id', taskController.update)

module.exports = router