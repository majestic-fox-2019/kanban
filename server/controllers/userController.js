const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { comparePass } = require('../helpers/bcrypt')

class UserController {
    static googleSign(req, res, next) {
        let payload
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(userData => {
            if(userData) {
                payload = {
                    id: userData.id,
                    email: userData.email
                }
                let token = jwt.sign(payload, process.env.JWT_SECRET)
                res.status(200).json({token, id: userData.id})
            } else {
                return User.create({
                    email: req.body.email,
                    password: process.env.DEFAULT_PASSWORD,
                    name: req.body.name
                })
            }
        })
        .then(createdUser => {
            payload = {
                id: createdUser.id,
                email: createdUser.email
            }
            let token = jwt.sign(payload, process.env.JWT_SECRET)
            res.status(200).json({token, id: createdUser.id})
        })
        .catch(err => {
            next(err)
        })
    }

    static register(req, res, next){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(createdUser => {
            let payload = {
                id: createdUser.id,
                email: createdUser.email
            }
            let token = jwt.sign(payload, process.env.JWT_SECRET)
            res.status(201).json({token, id: createdUser.id})
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        let userInfo
        User.findOne({
            where: {
                email: req.body.email,
            }
        })
        .then(userData => {
            if (!userData) {
                throw {
                    statusCode: 404,
                    message: 'Invalid email or password'
                }
            } else {
                userInfo = userData
                 return comparePass(req.body.password, userData.password)
            }
        })
        .then(result => {
            if (!result) {
                throw {
                    statusCode: 404,
                    message: 'Invalid email or password'
                }
            } else {
                let payload = {
                    id: userInfo.id,
                    email: userInfo.email
                }
                let token = jwt.sign(payload, process.env.JWT_SECRET)
                res.status(201).json({token, id: userInfo.id})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController