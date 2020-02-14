module.exports = (err, req, res, next) => {
  try {
    switch (err.name) {
      case 'NotFoundError':
        err.statusCode = 404
        err.message = 'User not found!'
        throw err
        break
      case 'SequelizeValidationError':
        let foundError = {}
        err.errors.forEach(error => {
          foundError[error.path] = error.message
        })
        err.statusCode = 400
        err.message = foundError
        throw err
        break
      case 'invalidLogin':
        err.statusCode = 400
        throw err
        break
      default:
        throw err
        break
    }

  } catch (error) {
    console.log(error, '< ni eror')
    res.status(err.statusCode || 500).json(err.message || error)
  }
}