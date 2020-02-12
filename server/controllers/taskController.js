const { Task, Project } = require('../models')

class TaskController {
  static getAllProjectTasks(req, res, next) {
    const id = req.params.projectId
    Task.findAll({ where: { ProjectId: id } })
      .then(results => {
        if (results.length == 0) {
          throw { code: 404, msg: 'You dont have any task yet' }
        } else {
          res.status(200).json(results)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static createTask(req, res, next) {
    const data = {
      title: req.body.title,
      description: req.body.description,
      assigned_to: null,
      status: 'backlog',
      ProjectId: req.params.projectId
    }
    Project.findOne({ where: { id: data.ProjectId } })
      .then(response => {
        if (!response) {
          throw { code: 404, msg: 'Project doesnt exist' }
        } else {
          return Task.create(data)
        }
      })
      .then(result => {
        res.status(201).json({
          result,
          msg: 'Task created'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTask(req, res, next) {
    const id = req.params.id
    console.log(id)
    Task.destroy({ where: { id: id } })
      .then(result => {
        res.status(200).json({
          result,
          msg: 'Task deleted'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static patchStatus(req, res, next) {
    const id = req.params.id
    const update = {
      status: req.body.status,
      assigned_to: null
    }
    Task.findOne({ where: { id: id } })
      .then(data => {
        if (data.assigned_to == null) {
          update.assigned_to = req.loggedIn.email
        } else {
          update.assigned_to = data.assigned_to
        }
        return Task.update(update, { where: { id: id } })
      })
      .then(result => {
        res.status(200).json({
          result,
          msg: 'Status updated'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static editTask(req, res, next) {
    const id = req.params.id
    const data = {
      title: req.body.title,
      description: req.body.description,
      assigned_to: req.body.assigned_to
    }
    Task.update(data, { where: { id: id } })
      .then(result => {
        res.status(200).json({
          result,
          msg: 'Task updated'
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TaskController
