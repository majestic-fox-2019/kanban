const { User } = require('../models')
const bcrypt = require('bcrypt')
const helper = require('../helpers/helper')

class UserController {
  static doLogin(req, res, next){
    let email = req.body.email
    let password = req.body.password
    User.findOne({
      where: {
        email : email
      }
    })
    .then(user => {
      if(user){
        if(bcrypt.compare(password, user.password)){
          const objUser = {
            id: user.id,
            email: user.email
          }
          const token = helper.authSign(objUser)
          res.status(200).json({ 
            code: 200,
            message: "Login successfull",
            payload: {
              Token: token,
              users: {
                name: user.name,
                email: user.email
              }
            }
          })
        }else{
          next({
            statusCode: 400,
            message: "Email or password is wrong"
          }) 
        }
      }else{
        next({
          statusCode: 401,
          message: "Email not registered"
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static doLoginGoogle(req, res, next){
    let name = req.body.name
    let email = req.body.email
    let pass = req.body.email
    User.findOne({
      where: {
        email: email
      }
    })
    .then(result => {
      if(!result){
        let objUser = {
          name: name,
          email: email,
          password: pass
        }
        return User.create(objUser)
      }else{
        if(bcrypt.compare(pass, result.password)){
          const objUser = {
            id: result.id,
            email: result.email
          }
          const token = helper.authSign(objUser)
          res.status(200).json({ 
            code: 200,
            message: "Login successfull",
            payload: {
              Token: token,
              users: {
                name: result.name,
                email: result.email
              }
            }
          })
        }
      }
    })
    .then(result => {
      let objUser = {
        id: result.id,
        email: result.email,
      }
      const token = helper.authSign(objUser)
      res.status(200).json({ 
        code: 200,
        message: "Login successfull",
        payload: {
          Token: token,
          users: {
            name: result.name,
            email: result.email
          }
        }
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static doRegister(req, res, next){
    let dataRegister = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: dataRegister.email
      }
    })
    .then(user => {
      if(!user){
        return User.create(dataRegister)
      }else{
        next({
          statusCode: 400,
          message: "Email has been registered"
        })
      }
    })
    .then(newuser => {
      res.status(200).json({
        code: 200,
        message: "Register user successfull",
        payload: newuser
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController