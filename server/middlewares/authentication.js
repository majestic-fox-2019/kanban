const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token
    let decoded = jwt.verify(token, process.env.JWT_TOKEN)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token!' })
  }
}