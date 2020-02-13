const jwt = require('jsonwebtoken')
function authentication (req, res, next) {
  try {
    const token = req.headers.token
    const user = jwt.verify(token, "RAHASIANIH")
    req.user = user
    next()
    
  } catch (error) {
    next({code: 401, message: "please login or register first to do this task!"})
  }
}

module.exports = authentication