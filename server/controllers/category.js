const {Category,Task} = require('../models')
class CategoryController{
  static create(req,res,next){
    const {categoryname} = req.body
    Category  
      .create({
        name:categoryname,
      })
      .then(result => {
        req.io.emit('task','reload')
        res.status(201).json(result)
      })
      .catch(next)
  }

  static delete(req,res,next){
    let deleted = null
    Category  
      .findOne({
        where:{
          id:req.params.id,
        },
        include:[{
          model:Task
        }]
      })
      .then(result => {
        if(result.Tasks.length !== 0){
          req.io.emit('task','reload')
          throw res.createError(403,"Category have task")
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
}

module.exports = CategoryController