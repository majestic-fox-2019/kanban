const { Task } = require('../models')
const createError = require('http-errors')

class TaskController {
  static create(req, res, next) {
    let task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      UserId: req.user.id
    }

    Task
      .create(task)
      .then(task => {
        // req.io.emit("add")
        res.status(201).json(task)
      })
      .catch(next)
  }

  static showAll(req, res, next) {

    Task
      .findAll()
      .then(tasks => {
        res.status(200).json(tasks)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    const task = {
      id: req.params.id
    }
    Task
      .findByPk(task.id)
      .then(tasks => {
        if (tasks) {
          res.status(200).json(tasks)
        } else {
          throw new createError.NotFound()
        }
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const task = {
      id: req.params.id
    }
    let deleted = {}

    Task
      .findByPk(task.id)
      .then(task => {
        if (task) {
          deleted = task
          return task
            .destroy()
        } else {
          throw new createError.NotFound()
        }
      })
      .then(() => {
        // req.io.emit("delete")
        res.status(200).json(deleted)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const taskId = req.params.id
    const task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      UserId: req.body.UserId
    }

    Task
      .update(task, {
        where: {
          id: taskId
        },
        returning: true
      })
      .then(result => {
        res.status(201).json(result[1][0])
      })
      .catch(next)
  }
}

module.exports = TaskController