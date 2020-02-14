const { Category, Task } = require('../models/index')
const createError = require('http-errors')

class TaskController {

  static createTask(req, res, next) {
    const objValue = {
      title: req.body.title,
      description: req.body.description,
      CategoryId: req.body.CategoryId,
      UserId: req.user.id,
      ProjectId : req.params.project_id
    }

    Task
      .create(objValue)
      .then(response => {
        req.io.emit('loadTask')
        res.status(200).json(response)
      })
      .catch(next)
  }

  static readTask(req, res, next) {
    Category
      .findAll({
        include : [{
          model : Task,
          where : {
            ProjectId : req.params.project_id
          },
          required : false
        }]
      })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static readTaskById(req, res, next) {
    Task
      .findOne({
        where: {
          id: req.params.user_id
        }
      })
      .then(response => {
        if (response != null) {
          res.status(200).json(response)
        } else {
          res.status(204).json({
            message: `Task doesn't exist!`
          })
        }
      })
      .catch(next)
  }

  static updateTaskById(req, res, next) {
    const objValue = {
      title: req.body.title,
      description: req.body.description,
    }

    Task
      .update(objValue, {
        where: {
          id: req.params.task_id
        },
        returning: true
      })
      .then(response => {
        req.io.emit('loadTask')
        res.status(200).json(response[1][0])
      })
      .catch(next)
  }

  static updateStatus(req, res, next){
    Task
      .findOne({
        where : {
          id : req.params.task_id
        }
      })
      .then(response => {
        const data ={
          CategoryId : response.CategoryId + 1
        }

        return Task.update(data, {
          where : {
            id : req.params.task_id
          },
          returning : true
        })
      })
      .then(response => {
        req.io.emit('loadTask')
        res.status(200).json(response[1][0])
      })
      .catch(next)
  }

  static backStatus(req, res, next){
    Task
    .findOne({
      where : {
        id : req.params.task_id
      }
    })
    .then(response => {
      const data ={
        CategoryId : response.CategoryId - 1
      }

      return Task.update(data, {
        where : {
          id : req.params.task_id
        },
        returning : true
      })
    })
    .then(response => {
      req.io.emit('loadTask')
      res.status(200).json(response[1][0])
    })
    .catch(next)
  }

  static deleteTaskById(req, res, next) {
    let data = {}

    Task
      .findOne({
        where: {
          id: req.params.task_id
        }
      })
      .then(response => {
        data = response
        return response.destroy()
      })
      .then(response => {
        req.io.emit('loadTask')
        res.status(200).json(data)
      })
      .catch(next)

  }

}

module.exports = TaskController