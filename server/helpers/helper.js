const jwt = require('jsonwebtoken')
if(process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}

exports.authSign = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY)
}

exports.authVerify = (bearer) => {
  return jwt.verify(bearer, process.env.SECRET_KEY)
}