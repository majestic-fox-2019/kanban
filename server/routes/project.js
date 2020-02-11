const ProjectRouter = require('express').Router()
const ProjectController = require('../controllers/project')
const {ProjectAuthorize} = require('../middlewares/authorization')

ProjectRouter.get('/', ProjectController.list)
ProjectRouter.post('/', ProjectController.add)
ProjectRouter.put('/:id', ProjectAuthorize, ProjectController.update)
ProjectRouter.delete('/:id', ProjectAuthorize, ProjectController.delete)

module.exports = ProjectRouter