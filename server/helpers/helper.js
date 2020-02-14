const jwt = require('jsonwebtoken')

exports.authSign = (user) => {
  return jwt.sign(user, 'secretkey')
}

exports.authVerify = (bearer) => {
  return jwt.verify(bearer, 'secretkey')
}