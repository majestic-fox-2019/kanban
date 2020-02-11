const {Project} = require('../models')
const {Task} = require('../models')

class ProjectController {
  
  static list(req, res, next){
    Project.findAll({where: { UserId: req.user.id }, order: [['id', 'ASC']], include: Task})
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => {
      next(error)
    })
  }

  static add(req, res, next){
    let addProject = {
      title: req.body.title,
      UserId: req.user.id
    }

    Project.create(addProject)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
  }

  static update(req, res, next){
    let projectId = {
      where: {
        id: req.params.id
      }
    }

    let updateProject = {
      title: req.body.title
    }

    Project.update(updateProject, projectId)
    .then(result => {
      res.status(200).json(updateProject)
    })
    .catch(error => {
      next(error)
    })
  }

  static delete(req, res, next){
    
    let projectId = {
      where: {
        id: req.params.id
      }
    }

    let taskId = {
      where: {
        ProjectId: req.params.id
      }
    }

    let projectData = Project.findByPk(req.params.id)
    let destroyProject = Project.destroy(projectId)
    let destroyTask = Task.destroy(taskId)
    Promise.all([projectData, destroyProject, destroyTask])
    .then(result => {
      res.status(200).json(result[0])
    })
    .catch(error => {
      res.send(error)
    })
  }
}

module.exports = ProjectController