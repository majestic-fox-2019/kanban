function errorHandler (err, req, res, next) {
  if(err){
    let result = null
    if(err.name === "SequelizeValidationError"){
      result = {}
      for (let i = 0; i < err.errors.length; i++){
        result[err.errors[i].path] = err.errors[i].message
      }
    }
    res.status(err.statusCode || 400).json(result || err)
  }
  else{
    res.status(500).json({"message":"Server currently unable to handle this request"})
  }
}

module.exports = errorHandler