const {Task} = require('../models')
const {Category} = require('../models')

class TaskController {
  
  static add(req, res, next){
    let addTask = {
      title: req.body.title,
      description: req.body.description,
      CategoryId: req.params.categoryId,
      UserId: req.user.id
    }

    Task.create(addTask)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => {
      next(error)
    })
  }

  static update(req, res, next){
    let taskId = {
      where: {
        id: req.params.id
      }
    }

    let updateTask = {
      title: req.body.title,
      description: req.body.description
    }

    Task.update(updateTask, taskId)
    .then(result => {
      res.status(200).json(updateTask)
    })
    .catch(error => {
      next(error)
    })
  }

  static delete(req, res,next){
    let taskId = {
      where: {
        id: req.params.id
      }
    }
    let taskData = Task.findByPk(req.params.id)
    let destroyData = Task.destroy(taskId)
    Promise.all([taskData, destroyData])
    .then(result => {
      res.status(200).json(result[0])
    })
    .catch(error => {
      next(error)
    })
  }

}

module.exports = TaskController