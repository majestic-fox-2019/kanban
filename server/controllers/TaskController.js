const { Task, User } = require('../models')

class TaskController {
  static getTaskList(req, res, next){
    Task.findAll({
      include: [
        { model : User }
      ],
      order: [['id', 'ASC']]
    })
    .then(tasks => {
      res.status(200).json({
        code: 200,
        message: 'Get task list successfull',
        payload: tasks
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static addTask(req, res, next){
    const dataAddTask = {
      title: req.body.title,
      category: req.body.category,
      UserId: req.user.id
    }

    Task.create(dataAddTask)
      .then(newTask => {
        req.io.emit('liveTask')
        res.status(200).json({
          code: 200,
          message: 'Create task successfull',
          payload: newTask
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static detailTask(req, res, next){
    const id_task = Number(req.params.id)
    Task.findByPk(id_task)
      .then(task => {
        if(task){
          res.status(200).json({
            code: 200,
            message: 'Get detail task successfull',
            payload: task
          })
        }else{
          throw {
            statusCode: 400,
            message: "Task not found"
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateTask(req, res, next){
    const dataUpdateTask = {
      title: req.body.title,
      category: req.body.category,
      UserId: req.user.id
    }

    const id_task = Number(req.params.id)

    Task.findOne({
      where: {
        id: id_task,
        UserId: dataUpdateTask.UserId
      }
    })
    .then(task => {
      if(task){
        return task.update(dataUpdateTask, { returning : true })
      }else{
        throw {
          statusCode: 400,
          message: "Task not found"
        }
      }
    })
    .then(result => {
      req.io.emit('liveTask')
      res.status(200).json({
        code: 200,
        message: 'Update task successfull',
        payload: result
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteTask(req, res, next){
    const id_task = Number(req.params.id)
    let dataDelete
    Task.findByPk(id_task)
    .then(task => {
      if(task){
        dataDelete = task
        return task.destroy()
      }else{
        throw {
          statusCode: 400,
          message: "Task not found"
        }
      }
    })
    .then(() => {
      req.io.emit('liveTask')
      res.status(200).json({
        code: 200,
        message: 'Delete task successfull',
        payload: dataDelete
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = TaskController