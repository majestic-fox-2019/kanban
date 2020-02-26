const router = require('express').Router()
const controller = require('../controllers/memberController')
const memberFind = require('../middlewares/memberFind')

router.post('/', memberFind, controller.addMember)

router.get('/:projectId', controller.findAllMembers)

router.delete('/:projectId', memberFind, controller.deleteMember)

module.exports = router