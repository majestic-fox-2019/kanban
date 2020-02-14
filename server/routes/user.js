"use strict"

const routes = require("express").Router()
const userController = require("../controllers/user")

routes.post("/login", userController.login)
routes.post("/login/google", userController.loginGoogle)
routes.post("/login/github", userController.loginGithub)
routes.post("/register", userController.register)

module.exports = routes