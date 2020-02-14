const express = require('express')
const route = express.Router()
const controller = require('../controllers/category')

route
    .get('/:id', controller.getCategory)
    .post('/', controller.postCategory)
    .put('/:id', controller.putCategory)
    .delete('/:id', controller.deleteCategory)

module.exports = route