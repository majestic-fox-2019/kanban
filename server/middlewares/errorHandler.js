module.exports = (err, req, res, next) => {
  if (err.name == "JsonWebTokenError"){
    res.status(401).json({message : "Token Invalid"})
  } else if (err.message){
    res.status(401).json(err)
  }
}