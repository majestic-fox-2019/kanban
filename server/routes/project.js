const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project')

router.get('/', projectController.showAll)
router.get('/:id', projectController.findOne)
router.post('/', projectController.create)
router.delete('/:id', projectController.delete)
router.put('/:id', projectController.update)


module.exports = router