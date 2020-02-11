if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const {verify} = require('../helpers/jwt')

module.exports = (req, res, next) => {
  try {
    let token = req.headers.token
    let user = verify(token)
    req.user = user
    next()
  } catch (error) {
    // res.send(error) 
    // console.log(error)
    next(error)
  }
}
