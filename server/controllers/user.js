"use strict"

const { User } = require("../models")
const { createToken } = require("../helpers/jwt")
const { checkPassword } = require("../helpers/bcrypt")
const createError = require("http-errors")
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);
const admin = require('firebase-admin');

const serviceAccount = require("../kanban-cool-firebase-adminsdk-uibkj-8dfbe38a5f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kanban-cool.firebaseio.com"
});

class UserController {
    static register(req, res, next) {
        const { email, password, name } = req.body
        if (password.length < 6) {
            next(createError(400, "password length min character 6"))
        }
        User.create({
            email,
            password,
            name
        })
            .then((user) => {
                const token = createToken(user)
                res.status(201).json({ user, token })
            }).catch(next);
    }
    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then((user) => {
                if (user) {
                    const pwd = checkPassword(password, user.password)
                    if (pwd) {
                        const token = createToken(user)
                        res.status(201).json({ user, token })
                    } else {
                        next(createError(400, "email/password wrong"))
                    }
                } else {
                    next(createError(400, "email/password wrong"))
                }
            }).catch(next);
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
                    let token = createToken(user)
                    res.status(200).json({ user, token })
                } else {
                    User.create({
                        email: payload.email,
                        password: "bebasaja",
                        name: payload.name,
                    })
                        .then((user) => {
                            let token = createToken(user)
                            res.status(200).json({ user, token })
                        })
                }
            })
            .catch(next);
    }
    static loginGithub(req, res, next) {
        const { uid } = req.body
        admin.auth().getUser(uid)
            .then((userRecord) => {
                return User.findOne({
                    where: {
                        email: userRecord.email
                    }
                })
            })
            .then((user) => {
                if (user) {
                    let token = createToken(user)
                    res.status(200).json({ user, token })
                } else {
                    User.create({
                        email: userRecord.email,
                        password: "bebasaja",
                        name: userRecord.name
                    })
                        .then((user) => {
                            let token = createToken(user)
                            res.status(200).json({ user, token })
                        })
                }
            })
            .catch(next);
    }
    static loginFb(req, res, next) {
        const { uid } = req.body
        admin.auth().getUser(uid)
            .then((userRecord) => {
                return User.findOne({
                    where: {
                        email: userRecord.email
                    }
                })
            })
            .then((user) => {
                if (user) {
                    let token = createToken(user)
                    res.status(200).json({ user, token })
                } else {
                    User.create({
                        email: userRecord.email,
                        password: "bebasaja",
                        name: userRecord.name
                    })
                        .then((user) => {
                            let token = createToken(user)
                            res.status(200).json({ user, token })
                        })
                }
            })
            .catch(next);
    }
}

module.exports = UserController