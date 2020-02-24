const {verifyToken} = require('../helper/jwt')
const {Task} = require('../models') 
module.exports = (req,res,next)=>{
  if(req.headers.token){
    req.user = verifyToken(req.headers.token)
    Task.findByPk(req.params.id)
      .then(data=>{
        if(data.UserId == req.user.id){
          console.log('ini')
          next()
        }else{
          next({
            status: 401,
            message: `don't have access`
          })
        }
      })
  }else{
    next({
      status: 400,
      message: `invalid token`
    })
  }
}