"use strict";

const { User } = require("../models");
const hashing = require("../helpers/login");
const jwt = require("jsonwebtoken");

class UserController {
  static login(req, res, next) {
    const { email } = req.body;
    // console.log(email, password, "jagungggg");
    User.findOne({
      where: {
        email: email
      }
    })
      .then(result => {
        if (result && hashing.compare(req.body.password, result.password)) {
          var token = jwt.sign(
            {
              id: result.id,
              email: result.email
            },
            process.env.secretCode
          );
          console.log(token, "tokeeennn");

          res.status(200).json(token);
        } else {
          throw {
            statusCode: 400,
            msg: "Your Email or Password is wrong!"
          };
        }
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }

  static register(req, res, next) {
    const { username, email, password } = req.body;
    // console.log(hashing.hashed(password, 10), "masukkk??");
    // console.log(password);
    const hashedPass = hashing.hashed(password, 10);
    // console.log(hashedPass);

    // res.status(200).json(resu);
    User.create({
      username,
      email,
      password: hashedPass
    })
      .then(result => {
        console.log(result, "masuk kok");
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
  }

  static users(req, res, next) {
    User.findAll()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = UserController;
