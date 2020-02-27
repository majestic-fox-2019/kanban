const jwt = require('jsonwebtoken')

function sign(data) {
  return jwt.sign(data, process.env.JWT_SECRET)
}

function verify(data) {
  return jwt.verify(data, process.env.JWT_SECRET)
}

module.exports = { sign, verify }
