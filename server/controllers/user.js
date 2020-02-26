const User = require('../models').User
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const nodemailer = require("nodemailer")

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
          let token = jwt.sign(user.email, process.env.JWT_PASS )
          req.headers.token = token
          res.status(200).json({user, token})
        }
      }
    })
  }

  static googleSignIn(req, res, next) {
    let payload
    client.verifyIdToken({
        idToken: req.body.id_token,
        audience:process.env.CLIENT_GOOGLE
    })
    .then(ticket => {
        payload = ticket.getPayload()
        console.log(payload)
        return User.findOne({where:{email:payload.email}})
      })
      .then(user => {
        if(user) {
          let token = jwt.sign(user.email, process.env.JWT_PASS )
            console.log(token)
            res.status(200).json({token, user:user.dataValues})
        } else {
            return User.create({
                email: payload.email,
                password: process.env.DEFAULT_PASS,
                name: payload.name
            })   
          }
     })
      .then(user => {
        let token = jwt.sign(user.dataValues.id, process.env.JWT_PASS )
          res.status(201).json({token, user:user.dataValues})
      })
      .catch(err => {
          next(err)
      })
     }

     static getAllUser(req, res, next) {
       User.findAll()
       .then(result => {
         res.status(200).json(result)
       })
       .catch(err =>{
         console.log(err)
        next(err) })
     }

    static sendReminding(req, res, next) {
      console.log(req.body)
       let email = req.body.email
       let textInput = req.body.inputText
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
          user: 'skincare.pairproject@gmail.com',
          pass: 'skincare12345'
        }
      });
      let mailOptions = {
        from: 'skincare.pairproject@gmail.com', 
        to: email, 
        subject: "Hello from kanban!", 
        text: "Hello world?", 
        html: textInput
      }
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log(err);
          next(err)
        }
        else {
          console.log('email sent');
          res.send(200).json("email sent")
         
        }
      })
    }

}

module.exports = UserController