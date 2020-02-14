const express = require('express')
const route = express.Router()
const controller = require('../controllers/category')
const authToken = require('../middleware/authToken')
const authorization = require('../middleware/authorization')

route.use(authToken)
route
    .get('/:id', controller.getCategory)
    .post('/', controller.postCategory)
    .put('/:id', controller.putCategory)
    .delete('/:id', controller.deleteCategory)

module.exports = route