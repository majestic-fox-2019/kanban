const {Task} = require('../models')
const {Category} = require('../models')
const createError = require('http-errors')

function CategoryAuthorize(req, res, next){
  Category.findByPk(req.params.id)
  .then(result => {
    if (!result) {
      throw createError(404, { message: 'Not Found' })
    } else if (result.UserId !== req.user.id || !req.user) {
      throw createError(401, { message: 'Not Authorized' })
    } else {
      next()
    }
  })
  .catch(error => {
    next(error)
  })
}

function TaskAuthorize(req, res, next){
  Task.findByPk(req.params.id)
  .then(result => {
    if (!result) {
      throw createError(404, { message: 'Not Found' })
    } else if (result.UserId !== req.user.id || !req.user) {
      throw createError(401, { message: 'Not Authorized' })
    } else {
      next()
    }
  })
  .catch(error => {
    next(error)
  })
}

module.exports = {
  CategoryAuthorize,
  TaskAuthorize
}