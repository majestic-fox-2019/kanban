const { Project, Task } = require('../models')
const jwt = require('jsonwebtoken')


class ProjectController {
  static showAll(req, res, next) {
    Project
      .findAll({
        includes: Task
      })
      .then(project => {
        const tokenproject = jwt.sign({ id: project[0].id }, 'TOKENPROJECT')
        res.status(200).json(tokenproject)
        // res.status(200).json(project)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    const project = {
      id: req.params.id
    }
    Project
      .findAll({
        where: {
          id: project.id
        },
        include: Task
      })
      .then(result => {
        if (result) {
          res.status(200).json(result)
        } else {
          throw new createError.NotFound()
        }
      })
      .catch(next)
  }

  static create(req, res, next) {
    let project = {
      name: req.body.name,
      UserId: req.user.id
    }
    Project
      .create(project)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const project = {
      id: req.params.id
    }
    let deleted = {}

    let deleteProject = Project
      .destroy({
        where: {
          id: project.id
        }
      })

    let deleteTask = Task
      .destroy({
        where: {
          ProjectId: project.id
        }
      })

    Promise.all([deleteProject, deleteTask])
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const id = req.params.id
    const project = {
      name: req.body.name,
      UserId: req.user.id
    }

    Project
      .update(project, {
        where: {
          id: id
        },
        returning: true
      })
      .then(result => {
        res.status(201).json(result[1][0])
      })
      .catch(next)
  }
}

module.exports = ProjectController