const { User } = require('../models/index')
const createError = require('http-errors')
const AuthHelper = require('../helper/userAuth')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {

  static googleSignIn(req, res, next) {
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.CLIENT_ID
    })
      .then(response => {
        const payload = response.getPayload()
        return User
          .findOne({
            where: {
              email: payload.email
            }
          })
          .then(response => {
            if (response != null) {
              const user = {
                id: response.id,
                name: response.name,
                email: response.email
              }

              const token = AuthHelper.signToken(user)
              res.status(200).json({
                email: response.email,
                token: token
              })
            } else {
              return User
                .create({
                  email: payload.email,
                  password: 'social',
                  name: payload.name,
                })
            }
          })
      })
      .then(response => {
        const user = {
          id: response.id,
          name: response.name,
          email: response.email
        }

        const token = AuthHelper.signToken(user)
        res.status(200).json({
          email: response.email,
          token: token
        })
      })
      .catch(next)
  }

  static loginHandler(req, res, next) {
    console.log(req.body.email, req.body.password)
    User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(response => {
        if (response != null) {
          if (AuthHelper.comparePassword(req.body.password, response.password)) {
            const user = {
              id: response.id,
              name: response.name,
              email: response.email
            }

            const token = AuthHelper.signToken(user)
            res.status(200).json({
              email: response.email,
              token: token
            })

          } else {
            throw createError(404, { name: 'Nodata', message: `Wrong email or password!` })
          }
        } else {
          throw createError(404, { name: 'Nodata', message: `Email doesn't exist!` })
        }

      })
      .catch(next)
  }

  static registerHandler(req, res, next) {

    let objValue = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    User
      .create(objValue)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)

  }

}


module.exports = UserController
