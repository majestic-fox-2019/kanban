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
      res.status(200).json(result)
    })
    .catch(error => {
      
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
      
    })
  }

  static delete(req, res,next){
    let taskId = {
      where: {
        id: req.params.id
      }
    }

    Task.destroy(taskId)
    .then(result => {

    })
    .catch(error => {
      
    })
  }

}

module.exports = TaskController