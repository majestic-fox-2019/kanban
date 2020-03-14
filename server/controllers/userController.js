const createError = require('http-errors');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  // register
  static register(req, res, next) {
    const { name, email, password } = req.body;
    User
      .create({
        name,
        email,
        password
      })
      .then((result) => {
        res.status(201);
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  }
  // login
  static login(req, res, next) {
    const { email, password } = req.body;
    if (!email) {
      next(createError(400, "Email or Password is invalid"));
    }
    else {
      User
        .findOne({
          where: {
            email
          }
        })
        .then((result) => {
          if (result) {
            const isValid = comparePassword(password || "", result.password);
            if (isValid) {
              const compose = {
                email: result.email
              }
              const payload = {
                name: result.name,
                access_token: signToken(compose)
              };
              res.status(200);
              res.json(payload);
            }
            else {
              next(createError(400, "Email or Password is invalid"));
            }
          }
          else {
            next(createError(400, "Email or Password is invalid"));
          }
        })
        .catch((err) => {
          next(err);
        });
    }
  }
  // google sign-in
  static gsignin(req, res, next) {
    const { id_token } = req.body;
    client
      .verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then((ticket) => {
        const payload = ticket.getPayload();
        const { email, name } = payload;
        // find email
        User
          .findOne({
            where: {
              email
            }
          })
          .then((foundUser) => {
            if (!foundUser) {
              User
                .create({
                  name,
                  email,
                  password: process.env.DEFAULT_PASSWORD
                })
                .then((createdUser) => {
                  const access_token = signToken({
                    email: createdUser.email
                  });
                  const payload = {
                    name: createdUser.name,
                    access_token
                  }
                  res.status(201);
                  res.json(payload);
                }).catch((err) => {
                  next(err);
                });
            }
            else {
              const access_token = signToken({
                email: foundUser.email
              });
              const payload = {
                name: foundUser.name,
                access_token
              }
              res.status(200);
              res.json(payload);
            }
          }).catch((err) => {
            next(err)
          });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;