module.exports = (err, req, res, next) => {
  if (err.name == "JsonWebTokenError"){
    res.status(401).json({message : "Token Invalid"})
  } else if (err.name == "SequelizeValidationError"){
    const arr = []
      err.errors.forEach(err => {
        arr.push({
          msg: err.message
        })
      });
    res.status(400).json(arr)
  } else if (err.message){
    res.status(400).json(err)
  }
}