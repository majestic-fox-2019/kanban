if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const {OAuth2Client} = require('google-auth-library');
const {User} = require('../models')
const {checkPassword} = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')
const createError = require('http-errors')

class UserController {

  static login(req, res, next){
    let userEmail = {
      where : {
        email: req.body.email
      }
    }
    User.findOne(userEmail)
    .then(user => { 
      if (!user){
        throw createError(404, {message : "User Not Found" })
      } else {
        if (checkPassword(req.body.password, user.password)){
          let data = {
            id: user.id,
            name: user.name,
            email: user.email
          }
          res.status(200).json({token: createToken(data)})
        } else {
          throw createError(400, {message: "Username / Password Wrong" })
        }
      }
    })
    .catch(error => {
      next(error)
    })
  }

  

  static register(req, res, next){
    console.log('asda')
    let userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    User.create(userData)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      next(error)
    })
  }

  static onSignIn(req, res, next){
    console.log('masukkk')
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let payload = null

    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
    .then(result => {
      payload = result.getPayload()
      return User.findOne({where: {email: payload.email}})
    })
    .then(user => {
      if (user){
        let data = {
          id: user.id,
          email: user.email
        }
        res.status(200).json({token: createToken(data)})
      } else {
        let data = {
          email: payload.email,
          name: payload.name,
          password: 'password'
        }
        return User.create(data)
      }
    })
    .then(result => {
      return User.findOne({where: {email: result.email}})
    })
    .then(result => {
      let obj = {
        id: result.id,
        email: result.email
      }
      res.status(200).json({token: createToken(obj)})
    })
    .catch(error => {
      next(error)
    })
  }

  static update(req, res, next){
    let userId = {
      where: {
        id: req.user.id
      },
      individualHooks: true
    }
    
    let userData = {
      name: req.body.name,
      password: req.body.password
    }

    User.update(userData, userId)
    .then(result => {
      res.status(200).json(userData)
    })
    .catch(error => {
      next(error)
    })
  }

}

module.exports = UserController