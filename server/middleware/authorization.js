

const { Task } = require('../models')
const createError = require('http-errors')

module.exports= function(req,res,next){
  Task
  .findOne({
    where: {id : req.params.id}
  })
  .then(result=>{
    if(result){
      if(result.UserId == req.user.id){
        res.status(200).json(result)
        
        next()
      } else {
        throw createError(403,'unathorized')
      }
    } else {
      res.status(404).json("data not found")
    }
  })
  .catch(err=>{
    next(err)
  })
}