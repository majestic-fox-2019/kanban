const { User } = require('../models')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static register(req, res, next) {
    let user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    User
      .create(user)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(next)
  }

  static login(req, res, next) {
    let user = {
      email: req.body.email,
      password: req.body.password
    }

    User
      .findOne({
        where: {
          email: user.email
        }
      })
      .then(result => {
        if (result) {
          const compare = bcrypt.compareSync(user.password, result.password)
          if (compare) {
            const token = jwt.sign({ id: result.id, email: result.email }, process.env.JWT_TOKEN)
            res.status(200).json({ token: token, UserId: result.id })
          } else {
            throw createError('Invalid email / password!', { name: 'invalidLogin' })
          }
        }
        else {
          throw new createError.NotFound()
        }
      })
      .catch(next)
  }

  static googleSignIn(req, res, next) {
    let user = null
    const client = new OAuth2Client(process.env.CLIENT_ID);
    client
      .verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID
      })
      .then(result => {
        user = result.getPayload()
        console.log(user, '< ini user')
        return User
          .findOne({
            where: {
              email: user.email
            }
          })
      })
      .then(result => {
        console.log(result, '< result user')
        if (result) {
          const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_TOKEN);
          res.status(200).json({ token: token, UserId: result.id })
        } else {
          return User
            .create({
              name: user.name,
              email: user.email,
              password: user.name
            })
        }
      })
      .then(result => {
        console.log('masuk')
        const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_TOKEN);
        res.status(200).json({ token: token, UserId: result.id })
        console.log(token, '< ini token')
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController