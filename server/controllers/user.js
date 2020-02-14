const {User} = require('../models')
const hash = require('../helpers/hash')
const {jwtSignIn} = require('../helpers/jwt')
class UserController{
  static register(req,res,next){
    const {email,password,name} =req.body
    User
      .create(
        {
          email,
          password,
          name
        }
      )
      .then(result => {
        let obj = {
          name:result.name,
          email:result.email
        }
        res.status(201).json(obj)
      })
      .catch(next)
  }

  static otherLogin(req,res,next){
    const {email,password,name} =req.body
    const user = {}
    User
      .findOne(
        {
          where:{
            email
          }
        }
      )
      .then(result => {
        if(result){
          return result
        }else{
          return  User
                  .create(
                    {
                      email,
                      password,
                      name
                    }
                  )
        }
      })
      .then(result => {
        user.email = result.email
        user.id = result.id
        user.name = result.name

        let token = jwtSignIn(user)
        let name = user.name
        res.status(200).json({name,token})
      })
      .catch(next)
  }

  static login(req,res,next){
    const {email,password} =req.body
    const user = {}
    User
      .findOne(
        {
          where:{
            email
          }
        }
      )
      .then(result => {
        if(result){
          user.email = result.email
          user.id = result.id
          user.name = result.name
          return hash.compare(password,result.password)
        }else{
          next(res.createError(400,"Email not found"))
        }
      })
      .then(result => {
        if(result){
          let token = jwtSignIn(user)
          let name = user.name
          res.status(200).json({name,token})
        }else{
          next(res.createError(400,"Password wrong"))
        }
      })
      .catch(next)
  }
}

module.exports = UserController