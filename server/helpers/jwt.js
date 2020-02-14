const jwt = require('jsonwebtoken')

function jwtSignIn(data){
  return jwt.sign(data,process.env.secret)
}

function jwtVerify(data){
  return jwt.verify(data,process.env.secret)
}

module.exports = {jwtVerify,jwtSignIn}