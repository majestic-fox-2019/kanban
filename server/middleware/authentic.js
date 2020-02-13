const jwt = require('jsonwebtoken')
const { User } = require('../models')
const errors = require('http-errors')
module.exports = (req, res, next) => {
  const token = req.headers.token
  try {
    const user = jwt.verify(token, process.env.JUTSU)
    req.user = user

    User.findOne({ where: { id: user.id } })
      .then(userData => {
        if (userData) {
          next()
        } else {
          throw ({
            statusCode: '401',
            message: 'Unauthorized'
          })
          // throw errors('406', 'Not Acceptable invalid token')
        }
      })
      .catch(err => [
        console.log(err)
      ])
  }
  catch (error) {
    res.status(404).json({ message: "Invalid Token " })
  }
} 