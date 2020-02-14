const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')
const auth = require('../middlewares/authentication')

router.get('/', taskController.showAll)

router.use(auth)

router.post('/', taskController.create)
router.get('/:id', taskController.findOne)
router.delete('/:id', taskController.delete)
router.put('/:id', taskController.update)


module.exports = router