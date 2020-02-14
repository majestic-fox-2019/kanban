"use strict"

const User              = require('./../models').User;
const {isAuthorized}    = require('./../helpers/authentication');
const jwt               = require('jsonwebtoken');

class UsersController {
    static register(req, res, next) {
        const {email, password} = req.body;
        User.create({
            email, 
            password
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            next(err);
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body;
        User
            .findOne({
                where: {
                    email
                }
            })
            .then(user => {
                if (user && isAuthorized(password, user.password)) {
                    const accessToken = jwt.sign({ 
                        id: user.id,
                        email: user.email
                    }, process.env.jwt_secret_key);

                    res.status(200).json({accessToken});
                }else{
                    throw {
                        statusCode: 400,
                        message: "Invalid email or password"
                    }
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = UsersController;