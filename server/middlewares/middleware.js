const { Task } = require('../models')
const helper = require('../helpers/helper')

exports.verifyToken = function(req, res, next){
  try{
    if(req.headers.bearer){
      let userToken = helper.authVerify(req.headers.bearer)
      if(userToken){
        req.user = userToken
        next()
      }
    }else{
      next({
        statusCode: 402,
        message: "Bearer is invalid"
      })
    }
  }
  catch(err){
    next(err)
  }
}

exports.authorUser = function(req, res, next){
  const id_todo = req.params.id
  Task.findOne({
    where: {
      id: id_todo,
    }
  })
  .then(result => {
    if(result){
      if(result.UserId === req.user.id){
        next()
      }else{
        throw {
          statusCode: 402,
          message: "No access"
        }
      }
    }else{
      throw {
        statusCode: 401,
        message: "Task not found"
      }
    }
  })
  .catch(err => {
    next(err)
  })
}