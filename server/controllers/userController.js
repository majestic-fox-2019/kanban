"use strict"

const { User } = require('../models')
const jwt = require('../helper/jwt')
const bcrypt = require('../helper/bcrypt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

class UserController {
    static create(req, res, next) {
        const { name, email, password } = req.body
        const body = {
            name,
            email,
            password
        }

        User.create(body)
            .then(user => {
                const token = jwt.generateToken(user)
                res.status(201).json({
                    access_token: token,
                    userId: user.id
                })
            })
            .catch(next)
    }

    static loginGoogle(req, res, next) {
        let payload = null
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID_GOOGLE
        })
            .then((ticket) => {
                payload = ticket.getPayload()
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })
            })
            .then((user) => {
                if (user) {
                    let token = jwt.generateToken(user)
                    res.status(201).json({
                        access_token: token,
                        userId: user.id
                    })
                } else {
                    User.create({
                        email: payload.email,
                        password: "kodok",
                        name: payload.name,
                    })
                        .then((user) => {
                            let token = jwt.generateToken(user)
                            res.status(201).json({
                                access_token: token,
                                userId: user.id
                            })
                        })
                }
            })
            .catch(next);
    }


    static login(req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (!user) {
                    next({ message: 'email/password salah' })
                } else {
                    if (!bcrypt.checkPassword(req.body.password, user.password)) {
                        next({ message: 'email/password salah' })
                    } else {
                        const token = jwt.generateToken(user)
                        console.log(token)
                        res.status(201).json({
                            access_token: token,
                            userId: user.id
                        })
                    }
                }
            })
            .catch(next)
    }
}

module.exports = UserController