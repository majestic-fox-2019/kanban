const ProjectRouter = require('express').Router()
const ProjectController = require('../controllers/project')
const {ProjectAuthorize, TaskAuthorize} = require('../middlewares/authorization')
const TaskController = require('../controllers/task')

ProjectRouter.get('/', ProjectController.list)
ProjectRouter.post('/', ProjectController.add)
ProjectRouter.put('/:id', ProjectAuthorize, ProjectController.update)
ProjectRouter.delete('/:id',  ProjectController.delete)

ProjectRouter.get('/:projectId/tasks', TaskController.list)
ProjectRouter.post('/:projectId/tasks', TaskController.add)
ProjectRouter.put('/:projectId/tasks/:id', TaskAuthorize, TaskController.update)
ProjectRouter.delete('/:projectId/tasks/:id', TaskAuthorize ,TaskController.delete)

module.exports = ProjectRouter