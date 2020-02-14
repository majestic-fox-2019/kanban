"use strict";

const { User } = require("../models");
const hashing = require("../helpers/login");
const jwt = require("jsonwebtoken");

class UserController {
  static login(req, res, next) {
    const { email, password } = req.body;
    // console.log(email, password, "jagungggg");
    User.findOne({
      where: {
        email: email
      }
    })
      .then(result => {
        if (result && hashing.hashed(req.password, result.password)) {
          // console.log(result.email, "cimbeeee");
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
            // msg: "HAHHH??"
          };
        }
      })
      .catch(err => {
        // console.log(err);

        next(err);
      });
  }

  static register(req, res, next) {
    const { username, email, password } = req.body;
    // console.log(hashing.hashed(password, 10), "masukkk??");
    const hashedPass = hashing.hashed(password, 10);

    const post = {
      username,
      email,
      password: hashedPass
    };
    // res.status(200).json(resu);
    User.create(post)
      .then(result => {
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
