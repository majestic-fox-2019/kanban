const {jwtVerify} = require('../helpers/jwt')
function authentication(req,res,next){
  if(req.headers.token){
    try {
      let user = jwtVerify(req.headers.token)
      req.user = user
      next()
    } catch (error) {
      let obj = {
        auth:error.message
      }
      next(res.createError(400,obj))
    }
  }else{
    let obj = {
      auth:"Token not found"
    }
    next(res.createError(400,obj))
  }
}

module.exports = {authentication}