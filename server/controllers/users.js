const { User } = require('../models')

const errors = require('http-errors')
const jwt = require('jsonwebtoken')
const bcyrpt = require('bcrypt')

class ControllerUser {

  static register(req, res, next) {
    let body = req.body
    User
      .create({
        name: body.name,
        email: body.email,
        password: body.password
      })
      .then(resultRegisterUser => {
        const token = jwt.sign({ email: resultRegisterUser.email, id: resultRegisterUser.id }, process.env.JUTSU)
        res.status(200).json(token)
      })
      .catch((err) => {
        // throw errors
        if (err.message != 0) {
          err.statusCode = '400'
        } else {
          err.statusCode = '500'
        }
        next(err)
      })
  }

  static login(req, res, next) {
    let email = req.body.email
    let password = req.body.password
    User
      .findOne({ where: { email: email } })
      .then(user => {
        if (!user) {
          res.status(401).json({ message: "Unauthorized" })
        } else {
          if (bcyrpt.compareSync(password, user.password)) {

            const token = jwt.sign({ email: user.email, id: user.id }, process.env.JUTSU)
            res.status(200).json(token)
          } else {
            res.status(401).json({ message: "Unauthorized" })
          }
        }
      })
      .catch(err => {
        res.status(404).json(err.message)
      })
  }

}

module.exports = ControllerUser