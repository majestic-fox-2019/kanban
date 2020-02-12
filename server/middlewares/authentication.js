const jwt = require('jsonwebtoken')
function authentication (req, res, next) {
  try {
    const token = req.headers.token
    const user = jwt.verify(token, "RAHASIANIH")
    req.user = user
    next()
    
  } catch (error) {
    next({code: 401, message: "invalid token"})
  }
}

module.exports = authentication