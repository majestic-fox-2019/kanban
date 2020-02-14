const Task = require('../models').Task
const User = require('../models').User
function authorisation (req, res, next) {
  let userId 
  // if(typeof Number(req.user))
  User.findOne({where:{email: req.user}})
  .then(user => {
    userId = user.id
    console.log(user.id, "<<<<<< ini user.id")
    return Task.findOne({where:{UserId: userId, id:req.params.id}})
  })  
  .then(task => {
    if(task){
      // console.log(task, "<<<<<ini TASK")
      next ()
    } else {
      next({code: 401, message: "user not allowed"})
    }
  })
  .catch(err => {
    next({code: 401, message: "user not allowed"})
  })

}

module.exports = authorisation