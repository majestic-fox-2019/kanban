function errorhandler (err, req, res, next) {
  if(err.code) {
    res.status(err.code).json({err, msg: err.message})
  } else if(err.errors) {
    let msgErrors = []
    err.errors.forEach(el => {
      msgErrors.push(el.message)      
    });
    res.status(400).json(msgErrors)
  } else {
    res.status(500).json({err, msg: "internal server error"})
  }
}

module.exports = errorhandler