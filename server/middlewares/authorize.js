const { Task } = require('../models')
const createError = require('http-errors')
function checkAvailability(req, res, next) {
  Task.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((task) => {
      if (!task) {
        let err = createError(404, 'Task not found')
        next(err)
      } else {
        req.task = task
        next()
      }
    })
    .catch((err) => {
      next(err)
    })
}

function authorize(req, res, next) {
  let { task } = req
  let err = createError(403, 'Unauthorized')
  console.log(task)
  if (!task.UserId && task.category == 'backlog') {
    next()
  } else if (task.UserId != req.userInfo.id) {
    next(err)
  } else if (task.UserId == req.userInfo.id) {
    next()
  }
}

module.exports = {
  checkAvailability,
  authorize
}
