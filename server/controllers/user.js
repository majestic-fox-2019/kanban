"use strict"

const { User } = require("../models")
const jwt = require("../helpers")
const bcrypt =require("../helpers") 

class userController {
    static register (req, res, next) {
        User.create({
            fullName: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
    static login (req, res, next) {
        let dataUser = null
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(result => {
            if(!result) throw {code: 404, message: "email/password is wrong"}
            dataUser = result
            return bcrypt.comparePass(req.body.password, result.password)
        })
        .then(result => {
            if(!result) {
                throw {code: 404, message: "email/password is wrong"}
            } else {
                const token = jwt.sign(dataUser.id)
                res.status(200).json({token})
            }
        })
        .catch(next)
    }
}
module.exports = userController