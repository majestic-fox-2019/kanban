'use strict'

const jwt = require('../helpers/jwt')
const createErrors = require('http-errors')
const bcrypt = require('bcrypt')

const { User } = require('../models')

class UserController {
    static login(req, res, next){
        
        User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                if(user && bcrypt.compareSync(req.body.password, user.password)){
                    let result = {
                        id: user.id,
                        email: user.email,
                    }
                    let token = jwt.generateToken(result)

                    res.status(200).json({ token: token, name:user.name })
                } else {
                    throw createErrors(400, 'Incorrect Username or Password')
                }
            })
            .catch(next)
    }

    static register(req, res, next){
        const { email, name, password } = req.body

        User
            .findOne({
                where: {
                    email
                }
            })
            .then(user => {
                if(!user){
                    return User.create({
                        email,
                        name,
                        password
                    })
                }
                throw createErrors(400, 'Email already registered')
            })
            .then(user => {
                res.status(201).json( { name: user.name , email: user.email})
            })
            .catch(err => {
                res
                    .status(400)
                    .json({ errors: err.message.split('\n')})
            })
    }


    static googleLogin(req, res, next){
        let { name, email } = req.body

        User
            .findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if(user){
                    let result = {
                        id: user.id,
                        email: user.email,
                    }

                    let token = jwt.generateToken(result)
                    res.status(200).json({ token: token, name:user.name })
                } else {
                    return User.create({
                        email,
                        name,
                        password: name
                    })
                    .then(user => {
                        let result = {
                            id: user.id,
                            email: user.email,
                        }
    
                        let token = jwt.generateToken(result)
                        res.status(201).json( { token: token, name:user.name })
                    })
                    .catch(err => {
                        res
                            .status(400)
                            .json({ errors: err.message.split('\n')})
                    })
                }
            })
    }
}

module.exports = UserController