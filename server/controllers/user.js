const User = require('../models').User
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {
  static register(req, res, next) {
    console.log(req.body.name, "masuuuuk")
    let objUser = {
      name: req.body.name,
      email:req.body.email,
      password: req.body.password
    }
    User.create(objUser)
    .then(user => {
      console.log(user)
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static login(req, res, next) {
    User.findOne({where:{email:req.body.email}})
    .then(user => {
      if(!user) {
        next({code:404, message: "name or email invalid"})
      } else {
        if(!bcrypt.compareSync(req.body.password, user.password)){
          next({code:404, message: "name or email invalid"})
        } else {
          let token = jwt.sign(user.email, "RAHASIANIH" )
          req.headers.token = token
          res.status(200).json({user, token})
        }
      }
    })
  }
}

module.exports = UserController