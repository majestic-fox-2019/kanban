const Task = require('../models').Task
const User = require('../models').User
class ControllerTask {
  static getAll (req, res, next) {
    // User.findAll({order: [["id", "asc"]],include:[Task]})
    // .then(users => {
    //   res.status(200).json(users)
    // })
    // .catch(err => {
    //   next(err)
    // })
    Task.findAll({
      include: [User]
    })
    .then(tasks => {
      res.status(200).json(tasks)
    })
    .catch(err => {
      next(err)
    })
  }

  static getOne(req, res, next) {
    Task.findOne({where: {id: req.params.id}})
    .then(task => {
      if(!task) {
        next({code: 404, message:"task not found"})
      } else {
        res.status(200).json(task)
      }
    })
    .catch(err => {
      next(err)
    })
  } 

  static adding(req, res, next) {
    
    let newEmail
    let objTask = {
      title: req.body.title,
      UserId: null,
      category: "Backlog",
      status : req.body.status,
      date: req.body.date
    }
      User.findOne({where: {email:req.user}})
      .then(user => {
        objTask.UserId = user.id
          return Task.create(objTask)
      })
      .then(task => {
        req.io.emit("livesocket")
        res.status(200).json(task)
      })
      .catch(err => {
        next(err)
      })
    
  }

  static deleting(req, res, next) {
    let task
    Task.findOne({where:{id:req.params.id}})
    .then(result => {
      if(!result) {
        next({code:404, message:"task not found"})
      } else {
        task = result
        return Task.destroy({where: {id:req.params.id}})
      }
    })
    .then(() => {
      req.io.emit("livesocket")
      res.status(200).json(task)
    })
    .catch(err => {
      next(err)
    })
  }

  static updatingNext(req, res, next) {
    let objTask
    Task.findOne({where: {id: req.params.id}})
    .then(task => {
      let newCategory
      if(task.category == "Backlog") {
        newCategory = "Product"
      } else if (task.category == "Product") {
        newCategory = "Development"
      } else if (task.category == "Development") {
        newCategory = "Done"
      }
      objTask = {
        title: task.title,
        category: newCategory,
        date: task.date,
        status : task.status
      }
      return Task.update(objTask, {where:{id:req.params.id}, returning: true})
    })
    .then(task => {
      req.io.emit("livesocket")
      res.status(200).json(task)
    })
    .catch(err => {
      next(err)
    })
  }

  static updatingBack(req, res, next) {
    let objTask
    Task.findOne({where: {id: req.params.id}})
    .then(task => {
      let newCategory
      if(task.category == "Done") {
        newCategory = "Development"
      } else if (task.category == "Development") {
        newCategory = "Product"
      } else if (task.category == "Product") {
        newCategory = "Backlog"
      }
      objTask = {
        title: task.title,
        category: newCategory,
        date: task.date,
        status : task.status
      }
      return Task.update(objTask, {where:{id:req.params.id}, returning: true})
    })
    .then(task => {
      req.io.emit("livesocket")
      res.status(200).json(task)
    })
    .catch(err => {
      next(err)
    })
  }
}



module.exports = ControllerTask