
const jwt = require('jsonwebtoken')

function createToken(token) {
  return jwt.sign(token, process.env.JWT_SECRET)
}

function verify(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  createToken,
  verify
}