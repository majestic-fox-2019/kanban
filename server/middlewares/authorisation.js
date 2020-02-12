const Task = require('../models').Task
const User = require('../models').User
function authorisation (req, res, next) {
  let userId 
  User.findOne({wher:{email: req.user}})
  .then(user => {
    userId = user.id
    return Task.findOne({where:{UserId: userId}})
  })  
  .then(task => {
    if(task){
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