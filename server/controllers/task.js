const {Task,Category,User} = require('../models')
class TaskController{
  static create(req,res,next){
    const {title,CategoryId} = req.body
    Task  
      .create({
        title,
        CategoryId,
        UserId : req.user.id
      })
      .then(result => {
        req.io.emit('task','reload')
        res.status(201).json(result)
      })
      .catch(next)
  }

  
  static findAll(req,res,next){
    Category
      .findAll({
        include:[
          {
            model:Task,
            include:[
              {
                model:User
              }
            ]
          },
        ],
        order: [
          ['id', 'ASC'],
        ],
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static delete(req,res,next){
    let deleted = null
    Task  
      .findOne({
        where:{
          id:req.params.id,
        }
      })
      .then(result => {
        if(!result){
          throw res.createError(404,"Not Found")
        }
        if(req.user.id !== result.UserId){
          req.io.emit('task','reload')
          throw res.createError(403,"Not Authorized")
        }else{
          deleted = result
          return result.destroy()
        }
      })
      .then(result => {
        req.io.emit('task','reload')
        res.status(200).json(deleted)
      })
      .catch(next)
  }

  static patch(req,res,next){
    const CategoryId = req.body.category
    Task  
      .findOne({
        where:{
          id:req.params.id
        }
      })
      .then(result => {
        if(!result){
          throw res.createError(404,"Not Found")
        }
        if(req.user.id !== result.UserId){
          req.io.emit('task','reload')
          throw res.createError(403,"Not Authorized")
        }else{
          return result
            .update({CategoryId})
        }
      })
      .then(result => {
        req.io.emit('task','reload')
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = TaskController