const router = require('express').Router()

const Controller = require('../controllers/task')

const authenticate = require('../middlewares/authenticate')

const { checkAvailability, authorize } = require('../middlewares/authorize')

router.use(authenticate)

router.get('/', Controller.readAll)

router.post('/', Controller.create)

router.get('/:id', Controller.readOne)

router.use('/:id', checkAvailability, authorize)

router.patch('/:id', Controller.updateCategory)

router.put('/:id', Controller.update)

router.delete('/:id', Controller.delete)

module.exports = router
