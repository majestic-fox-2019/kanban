'use strict'

const { User } = require('../models')
const { generateToken } = require('../middlewares/jwt')
const { compareHash } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_TOKEN)
const axios = require('axios')

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body
        User.create({
            email,
            password
        })
        .then(userCreated => {
            const token = generateToken(userCreated.dataValues)
            res.status(201). json({
                id: userCreated.id,
                email: userCreated.email,
                token: token
            })
        })
        .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if(user) {
                if(compareHash(password, user.password)) {
                    const token = generateToken(user.dataValues)
                    res.status(200).json({
                        id: user.id,
                        email: user.email,
                        token: token
                    })
                } else {
                    next({ status: 400, message: 'Email/password wrong' })
                }
            } else {
                next({ status: 400, message: 'Email/password wrong' })
            }
        })
        .catch(next)
    }

    static googlesignin(req, res, next) {
        let email = null
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_TOKEN
        })
        .then(ticket => {
            email = ticket.payload.email
            return User.findOne({
                where: {
                    email
                }
            })
        })
        .then(user => {
            if(user) {
                return user
            } else {
                return User.create({
                    email: email,
                    password: 'default'
                })
            }
        })
        .then(user => {
            const token = generateToken(user.dataValues)
            res.status(200).json({
                email: user.dataValues.email,
                token: token
            })
        })
        .catch(next)
    }

    static githubsignin(req, res, next) {
        const clientID = process.env.GITHUB_CLIENTID
        const clientSecret = process.env.GITHUB_CLIENTSECRET

        const requestToken = req.query.code
        
        axios({
            url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
            method: 'POST',
            headers: {
                accept: 'application/json'
            },
        })
        .then(response => {
            const accessToken = response.data.access_token
            res.redirect(`https://kanban-v1.firebaseapp.com/github.html?access_token=${accessToken}`)
        })
        .catch(next)
    }

    static githubsigninOk(req, res, next) {
        const { email } = req.body
        return User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if(user) {
                return user
            } else {
                return User.create({
                    email: email,
                    password: 'default'
                })
            }
        })
        .then(user => {
            const token = generateToken(user.dataValues)
            res.status(200).json({
                email: user.dataValues.email,
                token: token
            })
        })
        .catch(next)
    }
}

module.exports = UserController