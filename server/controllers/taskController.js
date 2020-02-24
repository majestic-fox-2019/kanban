const {Task, User} = require('../models')

class TaskController {
  static list(req,res,next){
    Task.findAll({
      include: [User],
      order: [['updatedAt', 'ASC']]
    })
      .then(list=>{
        let result = [
          {
            category: 'Backlog',
            tasks: []
          },
          {
            category: 'Product',
            tasks: []
          },
          {
            category: 'Development',
            tasks: []
          },
          {
            category: 'Done',
            tasks: []
          }
        ]
        for(let i = 0; i < result.length; i++){
          for(let j = 0; j < list.length; j++){
            if(result[i].category == list[j].dataValues.category){
              result[i].tasks.push({id: list[j].dataValues.id, title: list[j].dataValues.title, email: list[j].dataValues.User.email, date: list[j].dataValues.User.updatedAt})
            }
          }
        } 
        res.status(200).json(result)
      })
      .catch(err=>{
        next(err)
      })
  }

  static updateCategory(req,res,next){
    let newCategory = req.body.move
    Task.update({category: newCategory},{
      where: {
        id: req.params.id
      },
      returning: true
    })
    .then(task=>{
      console.log(req.body,req.params,'<<<<')
        req.io.emit('check', { message: 'task moved' })
        res.status(201).json(task)
      })
      .catch(err=>{
        next(err)
      })
  }
  
  static createTask(req,res,next){
    let {title,category} = req.body
    Task.create({title,category,UserId: req.user.id})
      .then(task=>{
        req.io.emit('check', { message: 'task created' })
        res.status(201).json(task)
      })
      .catch(err=>{
        next(err)
      })
  }

  static deleteTask(req,res,next){
    let data
    Task.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    })
      .then(task=>{
        data = task
        return task.destroy()
      })
      .then(result=>{
        req.io.emit('check', { message: 'task deleted' })
        res.status(201).json(data)
      })
      .catch(err=>{
        next(err)
      })
  }

  static updateTask(req,res,next){
    Task.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(task=>{
      let category = ['Backlog','Product','Development','Done']
      let newCategory
      for( let i = 0; i < category.length; i++){
        if(category[i] == task.category && req.body.move == "back"){
          newCategory = category[i-1]
        }
        if(category[i] == task.category && req.body.move == 'next'){
          newCategory = category[i+1]
        }
      }
      // console.log(task.category)
      return Task.update({category: newCategory},{
        where: {
          id: req.params.id
        },
        returning: true
      })
    })
    .then(updated=>{
      req.io.emit('check', { message: 'task updated' })
      res.status(201).json(updated)
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = TaskController