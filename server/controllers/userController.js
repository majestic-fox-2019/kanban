const {User} = require('../models')
const {compare} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')
class UserController {
  static register(req,res,next){
    const {username, email, password} = req.body
    User.findOne({
      where: {
        email: email
      }
    })
    .then(avail=>{
      if(avail == null){
        return User.create({username, email, password})
      }else{
        throw{
          status: 400,
          message: `email already used`
        }
      }
    })
    .then(user=>{
      let objUser = {
        id: user.dataValues.id,
        username: user.dataValues.username,
        email: user.dataValues.email
      }
      let token = generateToken(objUser)
      res.status(201).json({token: token, email:user.dataValues.email})
    })
    .catch(err=>{
      next(err)
    })
  }

  static facebookLogin(req,res,next){
    const {username, email} = req.body.data
    User.findOne({
      where: {
        email: email
      }
    })
    .then(user=>{
      if(user !== null){
        let objUser = {
          id: user.id,
          username: user.username,
          email: user.email
        }
        let token = generateToken(objUser)
        res.status(200).json({token: token, email:user.email})
      }else{
        return User.create({username,email,password: 'facebook'})
        .then(createduser=>{
          let objUser = {
            id: createduser.id,
            username: createduser.username,
            email: createduser.email
          }
          let token = generateToken(objUser)
          res.status(200).json({token: token, email:createduser.email})
        })
        .catch(err=>{
          next(err)
        })
      }
    })
  }

  static googleLogin(req,res,next){
    const {username, email} = req.body
    User.findOne({
      where: {
        email: email
      }
    })
    .then(user=>{
      if(user === null){
        return User.create({username,email,password: 'google'})
        .then(createduser=>{
          let objUser = {
            id: createduser.id,
            username: createduser.username,
            email: createduser.email
          }
          let token = generateToken(objUser)
          res.status(200).json({token: token, email:createduser.email})
        })
        .catch(err=>{
          next(err)
        })
      }else{
        let objUser = {
          id: user.id,
          username: user.username,
          email: user.email
        }
        let token = generateToken(objUser)
        res.status(200).json({token: token, email:user.email}) 
      }
    })
    
  }

  static login(req,res,next){
    const {email, password} = req.body
    User.findOne({
      where: {
        email
      }
    })
    .then(user=>{
      if(user !== null){
        if(compare(password,user.password)){
          let objUser = {
            id: user.id,
            username: user.username,
            email: user.email
          }
          let token = generateToken(objUser)
          res.status(200).json({token: token, email:user.email})
        }else{
          throw {
            status: 404,
            message: `username/password is wrong`
          }
        }
      }else{
        throw {
          status: 404,
          message: `username/password is wrong`
        }
      }
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = UserController