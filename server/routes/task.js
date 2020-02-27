const express = require('express')
const route = express.Router()
const controller = require('../controllers/task')
const authToken = require('../middleware/authToken')
const authorization = require('../middleware/authorization')

route.use(authToken)
route.get('/', controller.getTask)
route.post('/', controller.postTask)
route.put('/:id', controller.putTask)
route.delete('/:id', controller.deleteTask)

module.exports = route