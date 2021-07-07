
const jwt = require('jsonwebtoken')
const creatError = require('http-errors')

module.exports= function authentication(req,res,next){
  try {
    const token = req.headers.token
   
    const user = jwt.verify(token ,"Secret Key")
    console.log(user)
    req.user = user
    next()
  } catch (error) {
    throw creatError(403,'Unauthentication')
  }
}