const { Task } = require('../models')
const errors = require('http-errors')

module.exports = (req, res, next) => {
  Task
    .findOne({ where: { UserId: req.user.id, id: req.params.id } })
    .then(resultUser => {
      if (resultUser) {
        next()
      } else {
        throw ({
          statusCode: '401',
          message: 'Unauthorized'
        })
        // throw errors('401', 'Unauthorized')
      }
    })
    .catch(err => {
      // console.log(err)
      next(err)
    })
}
