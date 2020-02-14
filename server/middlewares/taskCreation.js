const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const tokenproject = req.headers.tokenproject
    let decoded = jwt.verify(tokenproject, 'TOKENPROJECT')
    req.project = decoded
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token!' })
  }
}