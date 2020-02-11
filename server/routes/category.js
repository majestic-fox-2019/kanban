const CategoryRouter = require('express').Router()
const CategoryController = require('../controllers/category')
const {CategoryAuthorize} = require('../middlewares/authorization')

CategoryRouter.get('/', CategoryController.list)
CategoryRouter.post('/', CategoryController.add)
CategoryRouter.put('/:id', CategoryAuthorize, CategoryController.update)
CategoryRouter.delete('/:id', CategoryAuthorize, CategoryController.delete)

module.exports = CategoryRouter