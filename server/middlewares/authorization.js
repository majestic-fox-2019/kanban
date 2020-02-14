const { Task } = require('../models/index')
const createError = require('http-errors')

module.exports = (req, res, next) => {

  Task
    .findOne({
      where: {
        id: req.params.task_id
      }
    })
    .then(response => {
      if (response != null) {
        if (response.UserId === req.user.id) {
          next()
        } else {
          throw createError(401, { name: 'Authorization', message: { error: 'Unauthorized' } })
        }
      } else {
        throw createError(404, { name: 'Nodata', message: { error: `Task doesn't exist!` } })

      }
    })
    .catch(next)

}