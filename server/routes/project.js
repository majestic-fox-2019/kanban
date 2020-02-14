const express = require('express')
const route = express.Router()
const controller = require('../controllers/project')
const authToken = require('../middleware/authToken')
const authorization = require('../middleware/authorization')

route.use(authToken)
route.get('/', controller.getProject)
route.post('/', controller.postProject)
route.put('/:id', controller.putProject)
route.delete('/:id', controller.deleteProject)

module.exports = route