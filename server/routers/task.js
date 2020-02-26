const router = require('express').Router()
const controller = require('../controllers/taskController')
const authorization = require('../middlewares/authorization')

router.get('/', controller.findAllTask)

router.post('/', controller.create)

router.use('/:id', authorization.task)

router.get('/:id', controller.findOne)

router.put('/:id', controller.updateOne)

router.patch('/:id/prev', controller.changeCategoryPrev)

router.patch('/:id', controller.changeCategoryNext)

router.delete('/:id', controller.delete)

module.exports = router