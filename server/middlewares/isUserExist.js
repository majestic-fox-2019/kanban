const { User } = require('../models/index')
const createError = require('http-errors')

module.exports = (req, res, next) => {

  User
    .findByPk(req.user.id)
    .then(response => {
      if (response != null) {
        next()
      } else {
        throw createError(404, { name: 'Nodata', message: { error: 'User not found!' } })
      }
    })
    .catch(next)

}