const { User } = require('../models')
const generateToken = require('../helpers/generateToken')
const createError = require('http-errors')
class Controller {
  static login(req, res, next) {
    let userData
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (!user) {
          let err = createError(401, 'Login error')
          next(err)
        } else {
          userData = user
          const compare = require('../helpers/compare')
          return compare(req.body.password, user.password)
        }
      })
      .then((result) => {
        if (!result) {
          let err = createError(401, 'Login error')
          next(err)
        } else {
          const payload = {
            id: userData.id,
            name: userData.name,
            email: userData.email
          }
          const token = generateToken(payload)
          res.status(200).json({
            token: token,
            name: userData.name,
            email: userData.email
          })
        }
      })
      .catch((err) => {
        next(err)
      })
  }

  static register(req, res, next) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      platform: 'normal'
    }
    User.create(data)
      .then((newUser) => {
        const payload = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }
        const token = generateToken(payload)
        res.status(201).json({
          token: token,
          name: newUser.name,
          email: newUser.email
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static gSignIn(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (user) {
          return user
        } else {
          return User.create({
            name: req.body.name,
            email: req.body.email,
            password: process.env.G_USER_DEF_PASS
          })
        }
      })
      .then((user) => {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        }
        const token = generateToken(payload)
        res.status(201).json({
          token: token,
          name: user.name,
          email: user.email
        })
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller
