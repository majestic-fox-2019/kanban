const {Task} = require('../models')
const {Project} = require('../models')
const createError = require('http-errors')

function ProjectAuthorize(req, res, next) {
  Project.findByPk(req.params.id)
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
    } else if (result.ProjectId !== Number(req.params.projectId)) {
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
  ProjectAuthorize,
  TaskAuthorize
}