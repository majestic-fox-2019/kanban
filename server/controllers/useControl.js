const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { Task } = require('../models')


class ControlUser{
  static register(req,res,next){
    let data ={
      email : req.body.email,
      name : req.body.name,
      password : req.body.password
    }
    console.log(data)
    User
    .findOne({
      where :  
      {email : data.email}
    })
    .then(avail=>{
    
      if(!avail){
        User.create(data)
        res.status(201).json(data)
      }else{

       let err =createError(406,'email is already exist')
        throw err
      }
    })
    .catch(err=>{
      next(err)
    })
  }

 static login(req,res,next){
  let data = {
    email: req.body.email,
    password : req.body.password
  }
  User.findOne({
    where: {email :data.email}
  })
  .then(result=>{
    if(result){
        if(bcrypt.compareSync(data.password,result.dataValues.password)){
          let obj = {
            email :result.email,
            id: result.id
          } 
          let token = jwt.sign(obj,"Secret Key")
          res.status(200).json({token : token})
        }else{
          throw createError(404,"Wrong Password")
        }
    }else{
      throw createError(404,"email not found")
    }
  })
  .catch(err=>{
    next(err)
  })

  }

 
  static getTask(req,res,next){
    // Task.findAll({
    //   where:{UserId: req.user.id}
    // })
    Task.findAll({
      order: [['updatedAt','ASC']]
    })
    .then(result=>{
    
      if(result.length!==0){
        res.status(200).json(result)
      }else{
        throw createError(404,"data empty")
      }
    })
    .catch(err=>{
      next(err)
    })
  }

  static postTask(req,res,next){
    let data ={
      title: req.body.title,
      category: req.body.category,
      UserId : req.user.id
    }
   
    Task.create(data)
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err=>{
      next(err)
    })
  }

  static findOne(req,res,next){
    Task.findByPk(req.params.id)
    .then(result=>{
 
      res.status(200).json(result)
    })
    .catch(err=>{
      next(err)
    })
  }

  static putTask(req,res,next){
    let data ={
      title: req.body.title,
      category: req.body.category,
    }
    console.log(data,"aaa")
    Task.update(data,{
      where : {id : req.params.id},
      returning : true
    })
    .then(result=>{
      res.status(201).json(result[1])
    })
    .catch(err=>{
      next(err)
    })
  }


  static deleteTask(req,res,next){
    let data = ""
    let id = req.params.id
    Task.findOne({
      where : {id : id}
    })
    .then(result=>{
      data = result
      return Task.destroy({
        where: {id:id}
      })
    })
    .then(()=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }
  
}

module.exports=ControlUser


// static login(req,res,next){
//   let data ={
//     email : req.body.email,
//     password : req.body.password
//   }

//   User.findOne({
//     where: {email : data.email}
//   })
//   .then(result=>{
//     if(result){
//       if(bcrypt.compareSync(data.password,result.dataValues.password)){
//         console.log(result)
//         let newObj = {
//           id : result.id,
//           email : result.email
//         }
//         res.status(200).json({token: jwt.sign(newObj,"Secret Key")})
//       }else{
//         console.log('salah')
//         throw createError(404,"Password Wrong")
//       }
//     }else{
//       throw createError(404,"Email Not Found")
//     }
//   })
//   .catch(err=>{
//     next(err)
//   })
// }
